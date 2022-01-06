const { check } = require("express-validator");

const { ErrorFormatter } = require("./mixins");

module.exports = [check("search").exists(), check("topN").exists().isInt({ min: 1 }).toInt(), ErrorFormatter];
