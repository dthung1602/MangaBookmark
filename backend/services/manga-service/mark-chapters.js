import { Manga } from "../../models/index.js";

async function markChapters(manga, isRead, chapterLinks) {
  for (let i = 0; i < chapterLinks.length; i++) {
    const pos = manga.chapters.findIndex((chap) => chap.link === chapterLinks[i]);
    if (pos > -1) {
      manga.chapters[pos].isRead = isRead;
    }
  }

  if (manga.isCompleted && manga.chapters.every((ch) => ch.isRead)) {
    manga.shelf = Manga.Shelf.FINISHED;
  }

  manga.markModified("chapters");
  return manga.save();
}

export default markChapters;
