const URLRegex = /^https?:\/\/nhattruyengo\.com\/truyen-tranh\/.+$/;

const { parseManga, parseChapters, parseAdditionalInfo, availableTags } = require("./NetTruyen");

module.exports = {
  active: true,
  lang: "vi",
  site: "NhatTruyen",
  homepage: "http://nhattruyengo.com/",
  URLRegex,
  parseManga,
  parseChapters,
  parseAdditionalInfo,
  availableTags,
};
