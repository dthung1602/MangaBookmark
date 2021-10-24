const URLRegex = /^https?:\/\/nhattruyenvip\.com\/truyen-tranh\/.+$/;

const { parseManga, parseChapters, parseAdditionalInfo, availableTags } = require("./NetTruyen");

module.exports = {
  active: true,
  lang: "vi",
  site: "NhatTruyen",
  homepage: "http://nhattruyenvip.com/",
  URLRegex,
  parseManga,
  parseChapters,
  parseAdditionalInfo,
  availableTags,
};
