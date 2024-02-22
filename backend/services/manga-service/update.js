import lodash from "lodash";

const { uniqBy } = lodash;
import { parseManga } from "./parsers/index.js";
import { pickCopy } from "../utils/index.js";
const additionalFields = ["authors", "description", "alternativeNames", "tags", "site"];

export default async function (manga, additionalUpdate = false) {
  const result = await parseManga(manga.link);
  const crawledManga = result.manga;
  const crawledChapters = crawledManga.chapters;

  manga.site = result.usedParser.site;

  manga.image = crawledManga.image;
  if (!manga.isCompleted && crawledManga.isCompleted) {
    manga.isCompleted = true;
  }

  manga.chapters.forEach((ch) => (ch.link = ch.link.trim()));
  manga.chapters = uniqBy(manga.chapters, (ch) => ch.link);

  let allChapterReplaced = true;
  for (let i = 0; i < manga.chapters.length; i++) {
    let pos = crawledChapters.findIndex((ch) => ch.link === manga.chapters[i].link);
    if (pos !== -1) {
      crawledChapters[pos] = manga.chapters[i];
      allChapterReplaced = false;
    }
  }

  if (allChapterReplaced) {
    for (let i = 0; i < manga.chapters.length; i++) {
      let pos = crawledChapters.findIndex((ch) => ch.name === manga.chapters[i].name);
      if (pos !== -1) {
        crawledChapters[pos] = manga.chapters[i];
      }
    }
  }

  manga.newChapCount = crawledChapters.filter((chap) => !chap._id).length;

  if (manga.newChapCount > 0) {
    manga.chapters = crawledChapters;
    manga.lastReleased = new Date();
    manga.markModified("chapters");
  }

  if (additionalUpdate) {
    pickCopy(manga, crawledManga, additionalFields);
    additionalFields.forEach((field) => manga.markModified(field));
  }

  return await manga.save();
}
