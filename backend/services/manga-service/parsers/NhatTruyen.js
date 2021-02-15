const URLRegex = /^https?:\/\/nhattruyen\.com\/truyen-tranh\/.+$/;

const { parseManga, parseChapters, parseAdditionalInfo, availableTags } = require("./NetTruyen");

module.exports = {
  active: true,
  lang: "vi",
  site: "NhatTruyen",
  homepage: "http://nhattruyen.com/",
  URLRegex,
  parseManga,
  parseChapters,
  parseAdditionalInfo,
  availableTags,
};
