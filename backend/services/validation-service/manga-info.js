const { check } = require("express-validator");

const MangaService = require("../manga-service");
const ErrorFormatter = require("./validation-error-formatter");

module.exports = [
  check("link")
    .exists()
    .custom(async (link, { req }) => {
      const parser = MangaService.parsers.getParser(link);
      if (!parser) {
        throw new Error("Unsupported manga site");
      }
      if (!parser.active) {
        throw new Error("Site no longer active");
      }
      req.parser = parser;
    }),
  ErrorFormatter,
];
