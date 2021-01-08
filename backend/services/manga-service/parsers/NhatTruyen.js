const URLRegex = /^https?:\/\/nhattruyen\.com\/truyen-tranh\/.+$/;

const { parseManga, parseChapters, parseAdditionalInfo } = require("./NetTruyen");

module.exports = {
  lang: "vi",
  site: "NhatTruyen",
  homepage: "http://nhattruyen.com/",
  URLRegex,
  parseManga,
  parseChapters,
  parseAdditionalInfo,
};
