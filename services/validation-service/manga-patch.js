const { check } = require("express-validator");

const { Manga } = require("models");
const { FollowingStatues } = Manga;
const MangaPermissionValidator = require("./manga-permission");
const ErrorFormatter = require("./validation-error-formatter");

module.exports = [
  check("following").optional().isIn(Object.values(FollowingStatues)),
  check("note").optional().trim(),
  check("isCompeted").optional().isBoolean(),
  check("hidden").optional().isBoolean(),
  MangaPermissionValidator,
  ErrorFormatter,
];
