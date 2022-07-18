const { check } = require("express-validator");

const { ErrorFormatter, FindUser } = require("./mixins");

module.exports = [
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
