const { Manga } = require("../../models");
const { getParser } = require("../../services/manga-service/parsers");
const { pickCopy } = require("../utils");

const fields = ["link", "user", "isCompleted", "shelf", "readChapters", "note", "hidden"];

module.exports = async function (userInput, parser = null) {
  const defaultData = {
    isCompleted: false,
    shelf: "reading",
    readChapters: [],
    note: "",
    hidden: false,
  };
  userInput = pickCopy(defaultData, userInput, fields);

  if (!parser) {
    parser = getParser(userInput.link);
  }
  let manga = await parser.parseManga(userInput.link);

  manga.chapters.forEach((chap) => (chap.isRead = userInput.readChapters.indexOf(chap.link) > -1));

  manga.newChapCount = manga.chapters.filter((chap) => !chap.isRead).length;

  pickCopy(manga, parser, ["site", "lang"]);
  pickCopy(manga, userInput, ["user", "shelf", "note", "hidden", "isCompleted"]);

  manga = await new Manga(manga).save();
  return manga;
};
