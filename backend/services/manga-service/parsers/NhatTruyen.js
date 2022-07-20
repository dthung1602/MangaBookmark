const URLRegex = /^https?:\/\/nhattruyenmoi\.com\/truyen-tranh\/.+$/;

const { parseManga, parseChapters, parseAdditionalInfo, availableTags } = require("./NetTruyen");

module.exports = {
  active: false,
  lang: "vi",
  site: "NhatTruyen",
  homepage: "http://nhattruyenmoi.com/",
  URLRegex,
  parseManga,
  parseChapters,
  parseAdditionalInfo,
  availableTags,
};
