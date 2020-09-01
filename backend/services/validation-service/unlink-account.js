const { check } = require("express-validator");

const { User } = require("../../models");
const ErrorFormatter = require("./validation-error-formatter");

module.exports = [
  check("provider")
    .exists()
    .isIn(["google", "facebook"])
    .custom(async (value, { req }) => {
      const user = await User.findById(req.user.id);
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
      req.user = user;
    }),
  ErrorFormatter,
];
