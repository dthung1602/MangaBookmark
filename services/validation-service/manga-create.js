const { check } = require("express-validator");
const { Manga } = require("models");
const { FollowingStatuses } = Manga;
const { ensureDBConnection } = require("services/db-service");
const MangaService = require("services/manga-service");

module.exports = [
  check("link")
    .exists()
    .custom(async (link, { req }) => {
      if (!MangaService.parsers.getParser(link)) {
        throw new Error("Unsupported manga source");
      }
      await ensureDBConnection();
      const manga = await Manga.findOne({ user: req.user.id, link: link });
      if (manga) {
        throw new Error("Duplicate manga");
      }
    }),
  check("readChapters").exists().isArray(),
  check("note").optional().trim(),
  check("isCompleted").optional().isBoolean(),
  check("hidden").optional().isBoolean(),
  check("following").exists().isIn(Object.values(FollowingStatuses)),
];
