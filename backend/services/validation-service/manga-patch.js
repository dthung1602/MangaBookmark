const { check } = require("express-validator");

const { Manga } = require("../../models");
const { Shelf } = Manga;
const MangaPermissionValidator = require("./manga-permission");
const ErrorFormatter = require("./validation-error-formatter");

module.exports = [
  check("shelf").optional().isIn(Object.values(Shelf)),
  check("note").optional().trim(),
  check("isCompleted").optional().isBoolean().toBoolean(),
  check("hidden").optional().isBoolean().toBoolean(),
  MangaPermissionValidator,
  ErrorFormatter,
];
