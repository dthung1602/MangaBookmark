const { check } = require("express-validator");

const MangaService = require("../manga-service");
const { ErrorFormatter } = require("./mixins");

module.exports = [
  check("link")
    .exists()
    .custom(async (link, { req }) => {
      req.parser = MangaService.parsers.getParser(link);
    }),
  ErrorFormatter,
];
