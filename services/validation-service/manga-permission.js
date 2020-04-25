const { check } = require("express-validator");

const { Manga } = require("models");
const ErrorFormatter = require("./validation-error-formatter");

module.exports = [
  check("manga", "Invalid manga ID")
    .exists()
    .custom(async (mangaID, { req }) => {
      const manga = await Manga.findById(mangaID);
      if (manga === null || manga.user.toString() !== req.user.id) {
        throw new Error("Cannot find manga");
      }
      req.manga = manga;
    }),
  ErrorFormatter,
];
