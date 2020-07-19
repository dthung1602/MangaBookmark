const { pick } = require("lodash");

const { Manga } = require("../../models");
const { getParser } = require("./parsers");

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

  manga.newChapCount = manga.chapters.filter((chap) => !chap.isRead).length;
  manga.source = parser.source;
  manga.user = data.userID;
  manga.following = data.following;
  manga.note = data.note;
  manga.hidden = data.hidden;
  manga.isCompleted = data.isCompleted;

  manga = await new Manga(manga).save();
  return manga;
};
