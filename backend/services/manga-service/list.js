const { isString } = require("lodash");

const { Manga } = require("../../models");
const { PAGE_SIZE } = require("../../config");

module.exports = async function (filters = {}, search = undefined, sort = undefined, page = 1, perPage = PAGE_SIZE) {
  // bug in express validator
  // the validator fails to convert wildcard field to int
  if (isString(filters.status)) {
    filters.status = parseInt(filters.status);
  }

  return Manga.advanceQuery(filters, search, sort, page, perPage);
};
