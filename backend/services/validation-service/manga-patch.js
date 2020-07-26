const { check } = require("express-validator");

const { Manga } = require("../../models");
const { FollowingStatuses } = Manga;
const MangaPermissionValidator = require("./manga-permission");
const ErrorFormatter = require("./validation-error-formatter");

module.exports = [
  check("following").optional().isIn(Object.values(FollowingStatuses)),
  check("note").optional().trim(),
  check("isCompleted").optional().isBoolean().toBoolean(),
  check("hidden").optional().isBoolean().toBoolean(),
  MangaPermissionValidator,
  ErrorFormatter,
];
