const { pick } = require("lodash");

const { Manga } = require("../../models");
const { getParser } = require("../../services/manga-service/parsers");
const { pickCopy } = require("../utils");

const fields = ["link", "user", "isCompleted", "shelf", "readChapters", "note", "hidden"];

module.exports = async function (data, parser = null) {
  const defaultData = {
    isCompleted: false,
    shelf: "reading",
    readChapters: [],
    note: "",
    hidden: false,
  };
  data = Object.assign(defaultData, pick(data, fields));

  if (!parser) {
    parser = getParser(data.link);
  }
  let manga = await parser.parseManga(data.link);

  manga.chapters.forEach((chap) => (chap.isRead = data.readChapters.indexOf(chap.link) > -1));

  manga.newChapCount = manga.chapters.filter((chap) => !chap.isRead).length;

  pickCopy(manga, parser, ["site", "language"]);
  pickCopy(manga, data, ["user", "shelf", "note", "hidden", "isCompleted"]);

  manga = await new Manga(manga).save();
  return manga;
};
