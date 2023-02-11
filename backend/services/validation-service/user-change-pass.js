import * as expressValidator from "express-validator";
import { ErrorFormatter, FindUser } from "./mixins/index.js";

const { check } = expressValidator;

export default [
  check("password").exists().isLength({ min: 8 }),
  FindUser,
  check("currentPassword")
    .exists()
    .custom(async (value, { req }) => {
      if (req.user.password && !req.user.validPassword(value)) {
        throw new Error("Incorrect current password");
      }
    }),
  ErrorFormatter,
];
