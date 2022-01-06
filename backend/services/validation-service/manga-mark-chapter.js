const { check } = require("express-validator");

const MangaPermissionValidator = require("./manga-permission");
const { ErrorFormatter } = require("./mixins");

module.exports = [
  check("isRead").exists().isBoolean().toBoolean(),
  check("chapters").exists().isArray(),
  MangaPermissionValidator,
  ErrorFormatter,
];
