const { Manga } = require("../../models");
const { PAGE_SIZE } = require("../../config");

module.exports = async function (filters = {}, search = undefined, sort = undefined, page = 0, perPage = PAGE_SIZE) {
  if (search) {
    filters.$text = { $search: search };
  }

  let mangas = Manga.find(filters);
  if (sort) {
    mangas = mangas.sort(sort);
  }
  if (perPage > 0 && page > 0) {
    mangas = mangas.skip((page - 1) * perPage).limit(perPage);
  }
  return await mangas;
};
