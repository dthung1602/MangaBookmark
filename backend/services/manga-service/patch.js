const { pick } = require("lodash");

const { Manga } = require("../../models");
const fields = ["shelf", "note", "isCompleted", "hidden"];
const nextRereadChapterFields = ["name", "link"];

module.exports = async function (manga, data) {
  Object.assign(manga, pick(data, fields));

  if (manga.shelf === Manga.Shelf.FINISHED) {
    manga.chapters.forEach((ch) => (ch.isRead = true));
  }
  if (manga.isCompleted && manga.chapters.every((ch) => ch.isRead)) {
    manga.shelf = Manga.Shelf.FINISHED;
  }

  if (data.shelf === Manga.Shelf.REREAD) {
    const nextRereadChapter = manga.chapters.find((ch) => ch.link === data.nextRereadChapter) || manga.chapters[0];
    manga.nextRereadChapter = pick(nextRereadChapter, nextRereadChapterFields);
  }

  return manga.save();
};
