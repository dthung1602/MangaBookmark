import lodash from "lodash";

import { Manga } from "../../models/index.js";
import { PAGE_SIZE } from "../../config.js";
const { isString } = lodash;

export default async function (filters = {}, search = undefined, sort = undefined, page = 1, perPage = PAGE_SIZE) {
  // bug in express validator
  // the validator fails to convert wildcard field to int
  if (isString(filters.status)) {
    filters.status = parseInt(filters.status);
  }

  return Manga.advanceQuery(filters, search, sort, page, perPage);
}
