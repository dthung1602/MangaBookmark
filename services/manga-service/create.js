const { pick } = require("lodash");

const { Manga } = require("../../models");
const { getParser } = require("../../services/manga-service/parsers")

const fields = ["url", "user", "isCompleted", "following", "readChapters", "note", "hidden"];

module.exports = async function (data, parser = null) {
  const defaultData = {
    isCompleted: false,
    following: "following",
    readChapters: [],
    note: "",
    hidden: false,
  };
  data = Object.assign(defaultData, pick(data, fields));

  if (!parser) {
    parser = getParser(data.url);
  }
  let manga = await parser.parseManga(data.url);

  manga.chapters.forEach((chap) => (chap.isRead = data.readChapters.indexOf(chap.link) > -1));

  manga.newChapCount = manga.chapters.filter((chap) => !chap.isRead).length;
  manga.source = parser.source;
  manga.user = data.user;
  manga.following = data.following;
  manga.note = data.note;
  manga.hidden = data.hidden;
  manga.isCompleted = data.isCompleted;

  manga = await new Manga(manga).save();
  return manga;
};
