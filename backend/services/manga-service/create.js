const { Manga } = require("../../models");
const { parseManga } = require("../../services/manga-service/parsers");
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

  const result = await parseManga(userInput.link, parser);
  const { manga } = result;
  parser = result.usedParser;

  manga.chapters.forEach((chap) => (chap.isRead = userInput.readChapters.indexOf(chap.link) > -1));

  manga.newChapCount = manga.chapters.filter((chap) => !chap.isRead).length;

  pickCopy(manga, parser, ["site", "lang"]);
  pickCopy(manga, userInput, ["user", "shelf", "note", "hidden", "isCompleted"]);

  return new Manga(manga).save();
};
