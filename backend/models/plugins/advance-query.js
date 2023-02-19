/**
 * Advance query plugin for mongoose
 *
 * This plugin add some extra search & filter functionalities
 * to a model via advanceSearch static method.
 *
 * Usage:
 *
 *    // in model definition file
 *    import { AdvanceQuery } from "path/to/advance-query.js";
 *    const MySchema = new mongoose.Schema(...);
 *    MySchema.plugin(AdvanceQuery, { <options> });
 *
 *    // when query
 *    const filters = { status: "active", createdAtGTE: "2020-12-12" };
 *    const textSearch = "example text";
 *    const sort = "name -status";
 *    const page = 2;
 *    const perPage = 5;
 *
 *    const result = await MySchema.advanceSearch(filters, textSearch, sort, page, perPage);
 */

import mongoose from "mongoose";
import lodash from "lodash";

const { ObjectId } = mongoose.Types;
const { isString, cloneDeep } = lodash;

/**
 * Convert range fields to proper mongoose query
 * Example:
 * {
 *    createdAtGTE: "2020-12-12",
 *    createdAtLTE: "2021-01-01",
 *    sumGTE: 123
 * }
 * becomes
 * {
 *    createdAt: { $gte: "2020-12-12", $lte: "2021-01-01T23:59:59.999Z" },
 *    sum: { $gte: 123 }
 * }
 * @param filters
 * @param field: the name of the field without prefixes GTE, LTE
 * @param isDate: whether to is field is a date
 */
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

/**
 * Convert sort to proper format
 * Example:
 *    "fieldA -fieldB" -> { fieldA: 1, fieldB: -1 }
 *    ["fieldA", "-fieldB"] -> { fieldA: 1, fieldB: -1 }
 * Note that "id" field is replaced by "_id"
 * If _id is not specified, _id: 1 is added to ensure consistency
 * @param sort
 */
function convertSort(sort) {
  if (isString(sort)) {
    sort = sort.split(" ").filter(Boolean);
  }
  sort = Object.fromEntries(sort.map((f) => (f.startsWith("-") ? [f.slice(1), -1] : [f, 1])));
  if (sort.hasOwnProperty("id")) {
    sort._id = sort.id;
    delete sort.id;
  }
  if (!sort.hasOwnProperty("_id")) {
    sort._id = 1;
  }
  return sort;
}

export default function (Schema, options = {}) {
  const rangeFields = options.rangeFields || [];
  const matchAnyFields = options.matchAnyFields || [];
  const matchAllFields = options.matchAllFields || [];
  const objectIdFields = options.objectIdFields || [];
  const defaultPageSize = options.defaultPageSize || -1;

  if (!objectIdFields.includes("_id")) {
    objectIdFields.push("_id");
  }

  Schema.statics.advanceQuery = async function (filters, textSearch, sort, page = 1, perPage = defaultPageSize) {
    // work with a copy of filters
    filters = cloneDeep(filters);

    // build query for fields with range
    for (let { field, isDate } of rangeFields) {
      convertRange(filters, field, isDate);
    }

    // build query for "match any" fields
    for (let field of matchAnyFields) {
      if (Array.isArray(filters[field])) {
        filters[field] = { $in: filters[field] };
      }
    }

    // build query for "match all" fields
    for (let field of matchAllFields) {
      if (Array.isArray(filters[field])) {
        filters[field] = { $all: filters[field] };
      }
    }

    // convert object id fields from string to ObjectId object
    for (let field of objectIdFields) {
      if (filters.hasOwnProperty(field)) {
        filters[field] = new ObjectId(filters[field]);
      }
    }

    // add text search to filters
    if (textSearch) {
      filters.$text = {
        $search: textSearch,
        $language: "en",
        $caseSensitive: false,
        $diacriticSensitive: false,
      };
    }

    // handle sorting & pagination logic
    const dataStages = [];
    if (sort) {
      dataStages.push({ $sort: convertSort(sort) });
    }
    const usePagination = perPage > 0;
    if (usePagination) {
      dataStages.push({ $skip: (page - 1) * perPage }, { $limit: perPage });
    }

    // execute the aggregation
    const result = await this.aggregate([
      { $match: filters },
      {
        $facet: {
          data: dataStages,
          count: [{ $group: { _id: null, count: { $sum: 1 } } }],
        },
      },
    ]).collation({ locale: "en" });

    // format the result
    const totalItem = result[0].count[0]?.count || 0;
    const totalPage = usePagination ? Math.ceil(totalItem / perPage) : 1;
    const isLastPage = page >= totalPage;
    const data = result[0].data.map((dt) => {
      const mg = new this(dt);
      mg.isNew = false;
      return mg;
    });

    return { data, page, totalItem, totalPage, isLastPage };
  };
}
