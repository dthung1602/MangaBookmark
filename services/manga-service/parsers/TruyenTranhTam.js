const URLRegex = /^https?:\/\/truyentranhtam\.com\/.+$/;
const { parseManga, parseChapters } = require("./TruyenTranh86");

module.exports = {
  source: "TruyenTranhTam",
  URLRegex,
  parseManga,
  parseChapters,
};
