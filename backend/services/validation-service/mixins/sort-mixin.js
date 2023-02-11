import * as expressValidator from "express-validator";
const { check } = expressValidator;

export default [
  check("sort.*")
    .optional()
    .matches(/^-?[0-9a-zA-Z]+$/),
];
