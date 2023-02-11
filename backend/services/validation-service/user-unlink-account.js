import * as expressValidator from "express-validator";
import { ErrorFormatter, FindUser } from "./mixins/index.js";

const { check } = expressValidator;

export default [
  FindUser,
  check("authProvider").custom(async (value, { req }) => {
    const { user } = req;
    if (value === "google") {
      if (!user.googleId) {
        throw new Error("There's no linked Google account");
      }
      if (!user.password && !user.facebookId) {
        throw new Error("Cannot unlink Google account. This is the only way to login.");
      }
    }
    if (value === "facebook") {
      if (!user.facebookId) {
        throw new Error("There's no linked Facebook account");
      }
      if (!user.password && !user.googleId) {
        throw new Error("Cannot unlink Facebook account. This is the only way to login.");
      }
    }
  }),
  ErrorFormatter,
];
