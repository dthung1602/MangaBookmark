const { check } = require("express-validator");

module.exports = [
  check("sort.*")
    .optional()
    .matches(/^-?[0-9a-zA-Z]+$/),
];
