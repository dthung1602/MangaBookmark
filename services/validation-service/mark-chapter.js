const { check } = require("express-validator");
const MangaPermissionValidator = require("./manga-permission");

module.exports = [check("isRead").exists().isBoolean, check("chapters").exists().isArray(), MangaPermissionValidator];
