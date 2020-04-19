async function markChapters(manga, isRead, chapterLinks) {
  for (let i = 0; i < chapterLinks.length; i++) {
    const pos = manga.chapters.findIndex((chap) => chap.link === chapterLinks[i]);
    if (pos > -1) {
      manga.chapters[pos].isRead = isRead;
    }
  }

  manga.markModified("chapters");
  return manga.save();
}

module.exports = {
  markChapters,
};
