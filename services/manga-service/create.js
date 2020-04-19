const Manga = require("../models/Manga");
const { getParser } = require("./parsers");
const { pick } = require("lodash");

const fields = ["url", "userID", "isCompleted", "following", "readChapters", "note", "hidden"];

module.exports = async function (data) {
  const defaultData = {
    isCompleted: false,
    following: "following",
    readChapters: [],
    note: "",
    hidden: false,
  };
  data = Object.assign(defaultData, pick(data, fields));

  const parser = getParser(data.url);
  if (parser === null) {
    throw new Error("Unsupported manga source");
  }

  let manga = await parser.parseManga(data.url);

  manga.chapters.forEach((chap) => (chap.isRead = data.readChapters.indexOf(chap.link) > -1));

  manga.source = parser.source;
  manga.user = data.userID;
  manga.following = data.following;
  manga.note = data.note;
  manga.hidden = data.hidden;
  manga.isCompleted = data.isCompleted;

  return new Manga(manga).save();
};
