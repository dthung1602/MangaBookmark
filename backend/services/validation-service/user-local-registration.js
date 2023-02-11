import * as expressValidator from "express-validator";
import { User } from "../../models/index.js";
import { ErrorFormatter } from "./mixins/index.js";

const { check } = expressValidator;

export default [
  check("username")
    .exists()
    .isLength({ min: 1 })
    .custom(async (username) => {
      if (await User.findOne({ username: username })) {
        throw new Error("Username taken");
      }
    }),
  check("password").exists().isLength({ min: 8 }),
  check("email")
    .exists()
    .isEmail()
    .custom(async (email) => {
      if (await User.findOne({ email: email })) {
        throw new Error("This email has already been registered for another account");
      }
    }),
  ErrorFormatter,
];
