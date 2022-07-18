const { pickCopy } = require("../utils");
const MangaParserService = require("./parsers");

module.exports = async function (link, parser) {
  const { manga } = await MangaParserService.parseManga(link, parser);
  pickCopy(manga, parser, ["site", "lang"]);
  return manga;
};
