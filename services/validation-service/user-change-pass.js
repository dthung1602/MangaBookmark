const { check } = require("express-validator");

const { User } = require("../models");
const ErrorFormatter = require("./validation-error-formatter");

module.exports = [
  check("password").exists().isLength({ min: 8 }),
  check("currentPassword")
    .exists()
    .custom(async (value, { req }) => {
      const user = await User.findById(req.user.id);
      if (user.password && !user.validPassword(value)) {
        throw new Error("Incorrect current password");
      }
      req.user = user;
    }),
  ErrorFormatter,
];
