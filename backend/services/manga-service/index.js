module.exports = {
  create: require("./create"),
  list: require("./list"),
  patch: require("./patch"),
  update: require("./update"),
  delete: require("./delete"),
  updateMultiple: require("./update-multiple"),
  parseManga: require("./parsers").parseManga,
  markChapters: require("./mark-chapters"),
  parsers: require("./parsers"),
};
