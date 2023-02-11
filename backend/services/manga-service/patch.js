import lodash from "lodash";

const { pick } = lodash;
import { Manga } from "../../models/index.js";
const fields = ["shelf", "note", "isCompleted", "hidden"];
const nextRereadChapterFields = ["name", "link"];

export default async function (manga, data) {
  Object.assign(manga, pick(data, fields));

  if (manga.shelf === Manga.Shelf.FINISHED) {
    manga.chapters.forEach((ch) => (ch.isRead = true));
  }
  if (
    manga.isCompleted &&
    manga.chapters.every((ch) => ch.isRead) &&
    data.shelf === undefined &&
    manga.shelf !== Manga.Shelf.REREAD
  ) {
    manga.shelf = Manga.Shelf.FINISHED;
  }

  if (data.shelf === Manga.Shelf.REREAD) {
    const chap1 = manga.chapters[manga.chapters.length - 1];
    const nextRereadChapter = manga.chapters.find((ch) => ch.link === data.nextRereadChapter) || chap1;
    manga.nextRereadChapter = pick(nextRereadChapter, nextRereadChapterFields);
  }

  return manga.save();
}
