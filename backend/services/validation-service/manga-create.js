const { check } = require("express-validator");

const { Manga } = require("../../models");
const { Shelf } = Manga;
const MangaService = require("../manga-service");
const ErrorFormatter = require("./validation-error-formatter");

module.exports = [
  check("link")
    .exists()
    .trim()
    .isURL()
    .custom(async (link, { req }) => {
      req.parser = MangaService.parsers.getParser(link);
      const manga = await Manga.findOne({ user: req.user.id, link: link });
      if (manga) {
        throw new Error("Manga already existed");
      }
    }),
  check("readChapters").optional().isArray(),
  check("note").optional().trim(),
  check("isCompleted").optional().isBoolean().toBoolean(),
  check("hidden").optional().isBoolean().toBoolean(),
  check("shelf").optional().isIn(Object.values(Shelf)),
  ErrorFormatter,
];
