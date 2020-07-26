const URLRegex = /^https?:\/\/nhattruyen\.com\/truyen-tranh\/.+$/;

const { parseManga, parseChapters } = require("./NetTruyen");

module.exports = {
  source: "NhatTruyen",
  URLRegex,
  parseManga,
  parseChapters,
};
