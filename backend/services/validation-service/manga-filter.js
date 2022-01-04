const { check } = require("express-validator");

const { Manga } = require("../../models");
const Pagination = require("./pagination");
const ErrorFormatter = require("./validation-error-formatter");

const MangaFilterValidator = [
  check("search").optional().trim(),
  check("shelf.*").optional().isIn(Object.values(Manga.Shelf)),
  check("isCompleted").optional().isBoolean().toBoolean(),
  check("status.*").optional().isInt({ min: 0, max: 3 }).toInt(),
  check("hidden").optional().isBoolean().toBoolean(),
  check("site.*").optional(),
  check("lang.*").optional().isIn(Object.values(Manga.Language)),
  check("createdAtGTE").optional().isDate(),
  check("createdAtLTE").optional().isDate(),
  check("lastReleasedGTE").optional().isDate(),
  check("lastReleasedLTE").optional().isDate(),
  check("unreadChapCountGTE").optional().isInt().toInt(),
  check("unreadChapCountLTE").optional().isInt().toInt(),
  check("tags.*").optional().trim(),
  ...Pagination,
  ErrorFormatter,
];

const MANGA_FILTER_FIELDS = [
  "shelf",
  "isCompleted",
  "status",
  "hidden",
  "site",
  "lang",
  "createdAtGTE",
  "createdAtLTE",
  "lastReleasedGTE",
  "lastReleasedLTE",
  "unreadChapCountGTE",
  "unreadChapCountLTE",
  "tags",
];

module.exports = { MangaFilterValidator, MANGA_FILTER_FIELDS };
