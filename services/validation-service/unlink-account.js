const { check } = require("express-validator");

const { User } = require("../../models");
const ErrorFormatter = require("./validation-error-formatter");

module.exports = [
  check("provider").exists().isIn(["google", "facebook"]),
  check("newPrimaryAccount")
    .exists()
    .isIn(["local", "facebook", "google"])
    .custom(async (value, { req }) => {
      if (value === req.params.provider) {
        throw new Error("Primary account must be changed after unlink");
      }

      const user = await User.findById(req.user.id);
      if (value === "google" && !user.googleId) {
        throw new Error("There's no linked Google account");
      }
      if (value === "facebook" && !user.facebookId) {
        throw new Error("There's no linked Facebook account");
      }
      req.user = user;
    }),
  ErrorFormatter,
];
