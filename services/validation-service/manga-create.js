const { check } = require("express-validator");

const { Manga } = require("../../models");
const { FollowingStatuses } = Manga;
const MangaService = require("../manga-service");
const ErrorFormatter = require("./validation-error-formatter");

module.exports = [
  check("link")
    .exists()
    .trim()
    .custom(async (link, { req }) => {
      if (!MangaService.parsers.getParser(link)) {
        throw new Error("Unsupported manga source");
      }
      const manga = await Manga.findOne({ user: req.user.id, link: link });
      if (manga) {
        throw new Error("Duplicate manga");
      }
    }),
  check("readChapters").exists().isArray(),
  check("note").optional().trim(),
  check("isCompleted").optional().isBoolean().toBoolean(),
  check("hidden").optional().isBoolean().toBoolean(),
  check("following").exists().isIn(Object.values(FollowingStatuses)),
  ErrorFormatter,
];
