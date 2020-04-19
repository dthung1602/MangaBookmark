const { check } = require("express-validator");
const { Manga } = require("models");
const { ensureDBConnection } = require("services/db-service");

module.exports = check("manga", "Invalid manga ID")
  .exists()
  .custom(async (mangaID, { req }) => {
    await ensureDBConnection();
    const manga = await Manga.findById(mangaID);
    if (manga === null || manga.user.toString() !== req.user.id) {
      throw new Error("Cannot find manga");
    }
    req.manga = manga;
  });
