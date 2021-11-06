const { pick } = require("lodash");

const { Manga } = require("../../models");
const fields = ["shelf", "note", "isCompleted", "hidden"];

module.exports = async function (manga, data) {
  Object.assign(manga, pick(data, fields));
  if (manga.shelf === Manga.Shelf.FINISHED) {
    manga.chapters.forEach((ch) => (ch.isRead = true));
  }
  if (manga.isCompleted && manga.chapters.every((ch) => ch.isRead)) {
    manga.shelf = Manga.Shelf.FINISHED;
  }
  return manga.save();
};
