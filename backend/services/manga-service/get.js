const { Manga } = require("../../models");

module.exports = async function (mangaID) {
  return Manga.findById(mangaID);
};
