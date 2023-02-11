import * as expressValidator from "express-validator";
import { getSearcher } from "../scanlation-site-searching-service/index.js";
import { ErrorFormatter } from "./mixins/index.js";

const { check } = expressValidator;

export default [
  check("search").exists(),
  check("topN").exists().isInt({ min: 1 }).toInt(),
  check("sites.*")
    .optional()
    .custom(async (sites) => {
      sites.map(getSearcher);
    }),
  ErrorFormatter,
];
