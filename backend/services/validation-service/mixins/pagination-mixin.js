const { check } = require("express-validator");

module.exports = [
  check("page").optional().isInt({ min: 1 }).toInt(),
  check("perPage").optional().isInt({ min: 0 }).toInt(),
];
