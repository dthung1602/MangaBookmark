const URLRegex = /^https?:\/\/truyentranhtam\.com\/.+$/;
const { parseManga, parseChapters } = require("./TruyenTranh86");

module.exports = {
  lang: "vi",
  site: "TruyenTranhTam",
  homepage: "http://truyentranhtam.com/",
  URLRegex,
  parseManga,
  parseChapters,
};
