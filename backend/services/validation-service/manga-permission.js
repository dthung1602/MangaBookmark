const { check } = require("express-validator");

const MangaService = require("../manga-service");
const { NotFoundError, PermissionError } = require("../../errors");
const { ErrorFormatter } = require("./mixins");

module.exports = [
  check("manga", "Invalid manga ID")
    .exists()
    .custom(async (mangaID, { req }) => {
      const manga = await MangaService.get(mangaID);
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
