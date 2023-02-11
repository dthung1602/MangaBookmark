import * as expressValidator from "express-validator";
const { check } = expressValidator;

export default [
  check("page").optional().isInt({ min: 1 }).toInt(),
  check("perPage").optional().isInt({ min: 0 }).toInt(),
];
