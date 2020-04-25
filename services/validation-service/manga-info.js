const { check } = require("express-validator");

const MangaService = require("services/manga-service");
const ErrorFormatter = require("./validation-error-formatter");

module.exports = [
  check("link")
    .exists()
    .custom(async (link, { req }) => {
      const parser = MangaService.parsers.getParser(link);
      if (!parser) {
        throw new Error("Unsupported manga source");
      }
      req.parser = parser;
    }),
  ErrorFormatter,
];
