const { Manga } = require("../../models");
const { PAGE_SIZE } = require("../../config");
const paginate = require("../pagination-service");

function convertDateRange(filters, field) {
  const gte = filters[`${field}GTE`];
  const lte = filters[`${field}LTE`];
  if (gte || lte) {
    filters[field] = {};
    if (gte) {
      delete filters[`${field}GTE`];
      filters[field].$gte = gte;
    }
    if (lte) {
      delete filters[`${field}LTE`];
      filters[field].$lte = lte + "T23:59:59.999Z";
    }
  }
}

module.exports = async function (filters = {}, search = undefined, sort = undefined, page = 1, perPage = PAGE_SIZE) {
  if (search) {
    filters.$text = { $search: search };
  }
  convertDateRange(filters, "createdAt");
  convertDateRange(filters, "lastReleased");

  let mangas = Manga.find(filters);
  if (sort) {
    if (sort.includes("name")) {
      mangas = mangas.collation({ locale: "en" }); // sort case-insensitively
    }
    mangas = mangas.sort(sort);
  }

  return await paginate(mangas, page, perPage);
};
