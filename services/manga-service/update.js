const { getParser } = require("./parsers");

module.exports = async function (manga) {
  const parser = getParser(manga.link);
  if (parser === null) {
    throw new Error("Unsupported manga source");
  }

  const crawledManga = await parser.parseManga(manga.link);
  const crawledChapters = crawledManga.chapters;

  manga.image = crawledManga.image;
  if (!manga.isCompleted && crawledManga.isCompleted) {
    manga.isCompleted = true;
  }

  for (let i = 0; i < manga.chapters.length; i++) {
    let pos = crawledChapters.findIndex((ch) => ch.link === manga.chapters[i].link);
    if (pos !== -1) {
      crawledChapters[pos] = manga.chapters[i];
    }
  }

  let newChapCount = 0;
  let unreadChapCount = 0;
  crawledChapters.forEach((chap) => {
    if (!chap._id) {
      newChapCount += 1;
    }
    if (!chap.isRead) {
      unreadChapCount += 1;
    }
  });

  if (newChapCount > 0) {
    manga.chapters = crawledChapters;
    manga.markModified("chapters");
  }

  await manga.save();
  // TODO virtual variable?
  return Object.assign(manga, {
    newChapCount,
    unreadChapCount,
  });
};
