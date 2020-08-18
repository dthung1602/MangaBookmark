const { check } = require("express-validator");

const { Manga } = require("../../models");
const ErrorFormatter = require("./validation-error-formatter");

const MangaFilterValidator = [
  check("search").optional().trim(),
  check("shelf").optional().isIn(Object.values(Manga.Shelf)),
  check("isCompleted").optional().isBoolean().toBoolean(),
  check("status").optional().isInt({ min: 0, max: 3 }).toInt(),
  check("hidden").optional().isBoolean().toBoolean(),
  check("site").optional(),
  check("page").optional().isInt({ min: 1 }).toInt(),
  check("perPage").optional().isInt({ min: 0 }).toInt(),
  check("sort")
    .optional()
    .matches(/^-?[0-9a-zA-Z]+$/),
  ErrorFormatter,
];

const MANGA_FILTER_FIELDS = ["shelf", "isCompleted", "status", "hidden", "site"];

module.exports = { MangaFilterValidator, MANGA_FILTER_FIELDS };
