const { Manga } = require("../../models");
const { PAGE_SIZE } = require("../../config");
const paginate = require("../pagination-service");

module.exports = async function (filters = {}, search = undefined, sort = undefined, page = 1, perPage = PAGE_SIZE) {
  if (search) {
    filters.$text = { $search: search };
  }

  let mangas = Manga.find(filters);
  if (sort) {
    if (sort.includes("name")) {
      mangas = mangas.collation({ locale: "en" }); // sort case-insensitively
    }
    mangas = mangas.sort(sort);
  }

  return await paginate(mangas, page, perPage);
};
