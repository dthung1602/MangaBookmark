const { isString } = require("lodash");
const { ObjectId } = require("mongoose").Types;
const { Manga } = require("../../models");
const { PAGE_SIZE } = require("../../config");
const paginate = require("../pagination-service");

function convertRange(filters, field, isDate = false) {
  let gte = filters[`${field}GTE`];
  let lte = filters[`${field}LTE`];
  if (gte || lte) {
    filters[field] = {};
    if (gte) {
      delete filters[`${field}GTE`];
      filters[field].$gte = isDate ? new Date(gte) : gte;
    }
    if (lte) {
      delete filters[`${field}LTE`];
      lte = isDate ? new Date(lte + "T23:59:59.999Z") : lte;
      filters[field].$lte = lte;
    }
  }
}

const multiValuedFields = ["shelf", "status", "site", "lang"];

module.exports = async function (filters = {}, search = undefined, sort = undefined, page = 1, perPage = PAGE_SIZE) {
  const usePagination = perPage > 0;

  if (filters.hasOwnProperty("user")) {
    filters.user = new ObjectId(filters.user);
  }

  for (let field of multiValuedFields) {
    if (Array.isArray(filters[field])) {
      filters[field] = { $in: filters[field] };
    }
  }

  // bug in express validator
  // the validator fails to convert wildcard fied to int
  if (isString(filters.status)) {
    filters.status = parseInt(filters.status);
  }

  if (search) {
    filters.$text = {
      $search: search,
      $language: "en",
      $caseSensitive: false,
      $diacriticSensitive: false,
    };
  }
  convertRange(filters, "createdAt", true);
  convertRange(filters, "lastReleased", true);
  convertRange(filters, "unreadChapCount");

  const query = [];
  if (sort) {
    if (isString(sort)) {
      sort = sort.split(" ").filter(Boolean);
    }
    sort = Object.fromEntries(sort.map((f) => (f.startsWith("-") ? [f.slice(1), -1] : [f, 1])));
    if ("id" in sort) {
      sort._id = sort.id;
      delete sort.id;
    }
    query.push({ $sort: sort });
  }
  if (usePagination) {
    query.push({ $skip: (page - 1) * perPage }, { $limit: perPage });
  }
  const result = await Manga.aggregate([
    { $match: filters },
    {
      $facet: {
        data: query,
        count: [{ $group: { _id: null, count: { $sum: 1 } } }],
      },
    },
  ]).collation({ locale: "en" });
  const totalItem = result[0].count[0]?.count || 0;
  const totalPage = usePagination ? Math.ceil(totalItem / perPage) : 1;
  const data = result[0].data.map((dt) => {
    const mg = new Manga(dt);
    mg.isNew = false;
    return mg;
  });
  return {
    data,
    page,
    totalItem,
    totalPage,
    isLastPage: page >= totalPage,
  };
};
