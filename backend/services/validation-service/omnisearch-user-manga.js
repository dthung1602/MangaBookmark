import * as expressValidator from "express-validator";
import { ErrorFormatter } from "./mixins/index.js";

const { check } = expressValidator;

export default [check("search").exists(), check("topN").exists().isInt({ min: 1 }).toInt(), ErrorFormatter];
