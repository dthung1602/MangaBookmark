import { pickCopy } from "../utils/index.js";
import MangaParserService from "./parsers/index.js";

export default async function (link, parser) {
  const { manga } = await MangaParserService.parseManga(link, parser);
  pickCopy(manga, parser, ["site", "lang"]);
  return manga;
}
