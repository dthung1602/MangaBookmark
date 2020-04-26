const { check } = require("express-validator");

const { User } = require("../../models");
const ErrorFormatter = require("./validation-error-formatter");

module.exports = [
  check("username")
    .exists()
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
        throw new Error("This email has already been registered for an account");
      }
    }),
  ErrorFormatter,
];
