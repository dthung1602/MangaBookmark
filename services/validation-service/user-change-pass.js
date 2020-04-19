const { check } = require("express-validator");
const { User } = require("../models");
const { ensureDBConnection } = require("services/db-service");

module.exports = [
  check("password").exists().isLength({ min: 8 }),
  check("currentPassword")
    .exists()
    .custom(async (value, { req }) => {
      await ensureDBConnection();
      const user = await User.findById(req.user.id);
      if (user.password && !user.validPassword(value)) {
        throw new Error("Incorrect current password");
      }
      req.user = user;
    }),
];
