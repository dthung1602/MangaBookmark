const { check } = require("express-validator");

const { Manga } = require("../../models");
const ErrorFormatter = require("./validation-error-formatter");

module.exports = [
  check("search").optional().trim(),
  check("following").optional().isIn(Object.values(Manga.FollowingStatuses)),
  check("isCompleted").optional().isBoolean(),
  check("status").optional().isInt({ min: 0, max: 3 }),
  check("page").optional().isInt({ min: 1 }),
  check("perPage").optional().isInt({ min: 1 }),
  check("hidden").optional().isBoolean(),
  check("sort")
    .optional()
    .matches(/^-?[0-9a-zA-Z]+$/),
  ErrorFormatter,
];
