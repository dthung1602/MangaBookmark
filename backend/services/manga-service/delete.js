const { Manga } = require("../../models");

module.exports = async function (manga) {
  await Manga.findByIdAndDelete(manga.id);
};
