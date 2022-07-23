const { Manga } = require("../../models");

async function updateRereadProgress(manga, nextRereadChapterLink) {
  const nextRereadChapterIdx = manga.chapters.findIndex((ch) => ch.link === nextRereadChapterLink);
  markChaptersAsRead(manga, nextRereadChapterIdx);
  updateNextRereadChapter(manga, nextRereadChapterIdx);
  updateMangaShelf(manga, nextRereadChapterIdx);
  return manga.save();
}

function markChaptersAsRead(manga, nextRereadChapterIdx) {
  let chaptersModified = false;
  for (let i = nextRereadChapterIdx + 1; i < manga.chapters.length; i++) {
    manga.chapters[i].isRead = true;
    chaptersModified = true;
  }
  if (chaptersModified) {
    manga.markModified("chapters");
  }
}

function updateNextRereadChapter(manga, nextRereadChapterIdx) {
  if (nextRereadChapterIdx === -1) {
    manga.nextRereadChapter = null;
  } else {
    manga.nextRereadChapter = {
      name: manga.chapters[nextRereadChapterIdx].name,
      link: manga.chapters[nextRereadChapterIdx].link,
    };
  }
}

function updateMangaShelf(manga, nextRereadChapterIdx) {
  if (nextRereadChapterIdx === -1) {
    manga.shelf = Manga.Shelf.READING;
  }
  if (manga.isCompleted && manga.chapters.every((ch) => ch.isRead) && manga.nextRereadChapter === null) {
    manga.shelf = Manga.Shelf.FINISHED;
  }
}

module.exports = updateRereadProgress;
