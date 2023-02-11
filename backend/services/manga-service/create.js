import lodash from "lodash";

import { Manga } from "../../models/index.js";
import { parseManga } from "./parsers/index.js";
import { pickCopy } from "../utils/index.js";

const { pick } = lodash;
const { Shelf } = Manga;
const fields = ["link", "user", "isCompleted", "shelf", "readChapters", "nextRereadChapterLink", "note", "hidden"];

export default async function (userInput, parser = null) {
  const defaultData = {
    isCompleted: false,
    shelf: "reading",
    readChapters: [],
    nextRereadChapterLink: null,
    note: "",
    hidden: false,
  };
  userInput = pickCopy(defaultData, userInput, fields);

  const result = await parseManga(userInput.link, parser);
  const { manga } = result;
  parser = result.usedParser;

  manga.chapters.forEach((chap) => (chap.isRead = userInput.readChapters.indexOf(chap.link) > -1));

  manga.newChapCount = manga.chapters.filter((chap) => !chap.isRead).length;

  if (userInput.shelf === Shelf.REREAD && userInput.nextRereadChapterLink !== null) {
    const nextRereadChapter = manga.chapters.find((ch) => ch.link === userInput.nextRereadChapterLink);
    manga.nextRereadChapter = pick(nextRereadChapter, ["name", "link"]);
  }

  pickCopy(manga, parser, ["site", "lang"]);
  pickCopy(manga, userInput, ["user", "shelf", "note", "hidden", "isCompleted"]);

  return new Manga(manga).save();
}
