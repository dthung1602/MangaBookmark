const URLRegex = /^https?:\/\/nhattruyen\.com\/truyen-tranh\/.+$/;

const { parseManga, parseChapters } = require("./NetTruyen");

module.exports = {
  language: "vi",
  site: "NhatTruyen",
  homepage: "http://nhattruyen.com/",
  URLRegex,
  parseManga,
  parseChapters,
};
