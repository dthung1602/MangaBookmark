const URLRegex = /^https?:\/\/truyentranh869\.com\/.+$/;
const { parseManga, parseChapters } = require("./TruyenTranh86");

module.exports = {
  source: "TruyenTranh869",
  URLRegex,
  parseManga,
  parseChapters,
};
