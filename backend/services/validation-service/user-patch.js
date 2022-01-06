const { check } = require("express-validator");

const { User } = require("../../models");
const { ErrorFormatter } = require("./mixins");

module.exports = [
  check("username")
    .optional()
    .isLength({ min: 1 })
    .custom(async (username, { req }) => {
      const user = await User.findById(req.user.id);
      const usernameUser = await User.findOne({ username: username });
      if (usernameUser && usernameUser.id !== user.id) {
        throw new Error("Username taken");
      }
      req.user = user;
    }),
  check("email")
    .optional()
    .isEmail()
    .custom(async (email, { req }) => {
      const emailUSer = await User.findOne({ email: email });
      if (emailUSer && emailUSer.id !== req.user.id) {
        throw new Error("This email has already been registered for another account");
      }
    }),
  check("avatar").optional().isURL(),
  check("note").optional().trim(),
  ErrorFormatter,
];
