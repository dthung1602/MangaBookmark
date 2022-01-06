const { check } = require("express-validator");

const { getSearcher } = require("../scanlation-site-searching-service");
const { ErrorFormatter } = require("./mixins");

module.exports = [
  check("search").exists(),
  check("topN").exists().isInt({ min: 1 }).toInt(),
  check("sites")
    .optional()
    .isArray()
    .custom(async (sites) => {
      sites.map(getSearcher);
    }),
  ErrorFormatter,
];
