module.exports = {
  create: require("./create"),
  get: require("./get"),
  list: require("./list"),
  patch: require("./patch"),
  update: require("./update"),
  delete: require("./delete"),
  getInfo: require("./get-info"),
  updateMultiple: require("./update-multiple"),
  parseManga: require("./parsers").parseManga,
  markChapters: require("./mark-chapters"),
  updateRereadProgress: require("./update-reread-progress"),
  parsers: require("./parsers"),
};
