const URLRegex = /^https?:\/\/mangakakalots\.com\/manga\/.+$/;
const { parseManga, parseChapters } = require("./Mangakakalot");

module.exports = {
  source: "MangakakalotS",
  URLRegex,
  parseManga,
  parseChapters,
};
