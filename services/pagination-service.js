const { PAGE_SIZE } = require("../config");

function cloneQuery(query) {
  return query.model.find().merge(query).skip(0).limit(0);
}

module.exports = async function (query, page = 1, perPage = PAGE_SIZE) {
  const promises = [query.exec(), cloneQuery(query).countDocuments().exec()];

  const [data, totalItem] = await Promise.all(promises);
  let totalPage = 1;

  if (perPage > 0 && page > 0) {
    query.skip((page - 1) * perPage).limit(perPage);
    totalPage = Math.ceil(totalItem / perPage);
  }

  return { data, totalItem, totalPage };
};
