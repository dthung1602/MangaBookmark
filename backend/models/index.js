const { OmnisearchUserMangaResult, OmnisearchScanlationMangaResult } = require("./OmnisearchResult");

module.exports = {
  Manga: require("./Manga"),
  MangaUpdateSummary: require("./MangaUpdateSummary"),
  User: require("./User"),
  Subscription: require("./Subscription"),
  ApplicationMeta: require("./ApplicationMeta"),
  OmnisearchUserMangaResult,
  OmnisearchScanlationMangaResult,
};
