const { check } = require("express-validator");

const { Manga } = require("models");
const ErrorFormatter = require("./validation-error-formatter");

module.exports = [
  check("search").trim(),
  check("following").isIn(Object.values(Manga.FollowingStatuses)),
  check("isCompleted").isBoolean,
  check("status").isInt({ min: 0, max: 3 }),
  check("page").isInt({ min: 1 }),
  check("perPage").isInt({ min: 1 }),
  check("hidden").isBoolean(),
  check("sort").matches(/^-?[0-9a-zA-Z]+$/),
  ErrorFormatter,
];
