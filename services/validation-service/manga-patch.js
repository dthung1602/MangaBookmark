const { check } = require("express-validator");
const MangaPermissionValidator = require("./manga-permission");
const {
  Manga: { FollowingStatues },
} = require("models");

module.exports = [
  check("following").optional().isIn(Object.values(FollowingStatues)),
  check("note").optional().trim(),
  check("isCompeted").optional().isBoolean(),
  check("hidden").optional().isBoolean(),
  MangaPermissionValidator,
];
