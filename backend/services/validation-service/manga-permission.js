const { check } = require("express-validator");

const { Manga } = require("../../models");
const { NotFoundError, PermissionError } = require("../../errors");
const ErrorFormatter = require("./validation-error-formatter");

module.exports = [
  check("manga", "Invalid manga ID")
    .exists()
    .custom(async (mangaID, { req }) => {
      const manga = await Manga.findById(mangaID);
      if (manga === null) {
        throw new NotFoundError();
      }
      if (manga.user.toString() !== req.user.id) {
        throw new PermissionError();
      }
      req.manga = manga;
    }),
  ErrorFormatter,
];
