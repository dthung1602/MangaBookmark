const { check } = require("express-validator");

const { Manga } = require("../../models");
const MangaPermissionValidator = require("./manga-permission");
const ErrorFormatter = require("./validation-error-formatter");
const { ValidationError } = require("../../errors");

module.exports = [
  MangaPermissionValidator,
  (req, res, next) => {
    if (req.manga.shelf === Manga.Shelf.REREAD) {
      next();
    } else {
      next(new ValidationError("Manga must be in reread shelf"));
    }
  },
  check("nextRereadChapterLink")
    .exists()
    .trim()
    .custom(async (nextRereadChapterLink, { req }) => {
      if (nextRereadChapterLink === "") {
        return;
      }
      try {
        new URL(nextRereadChapterLink);
      } catch (e) {
        throw ValidationError("Invalid URL");
      }
      const idx = req.manga.chapters.find((ch) => ch.link === nextRereadChapterLink);
      if (idx === -1) {
        throw new ValidationError("Cannot find chapter");
      }
    }),
  ErrorFormatter,
];
