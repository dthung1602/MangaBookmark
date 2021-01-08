const URLRegex = /^https?:\/\/truyentranh869\.com\/.+$/;
const { parseManga, parseChapters } = require("./TruyenTranh86");

module.exports = {
  lang: "vi",
  site: "TruyenTranh869",
  homepage: "http://truyentranh869.com/",
  URLRegex,
  parseManga,
  parseChapters,
};
