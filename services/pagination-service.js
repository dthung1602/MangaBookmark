const { PAGE_SIZE } = require("../config");

function cloneQuery(query) {
  // See https://stackoverflow.com/a/45444935/7342188
  // Because countDocuments() is used instead of the deprecated count(),
  // limit is set to a large number, not 0
  return query.model.find().merge(query).skip(0).limit(Number.MAX_SAFE_INTEGER);
}

module.exports = async function (query, page = 1, perPage = PAGE_SIZE) {
  const usePagination = perPage > 0;
  if (usePagination) {
    query.skip((page - 1) * perPage).limit(perPage);
  }

  const promises = [query, cloneQuery(query).countDocuments()];
  const [data, totalItem] = await Promise.all(promises);

  let totalPage = usePagination ? Math.ceil(totalItem / perPage) : 1;
  return { data, page, totalItem, totalPage };
};
