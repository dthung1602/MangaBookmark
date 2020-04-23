const { check } = require("express-validator");
const { User: LocalUserRegistration } = require("models");
const { ensureDBConnection } = require("services/db-service");

module.exports = [
  check("username")
    .exists()
    .custom(async (username) => {
      await ensureDBConnection();
      if (await LocalUserRegistration.findOne({ username: username })) {
        throw new Error("Username taken");
      }
    }),
  check("password").exists().isLength({ min: 8 }),
  check("email")
    .exists()
    .isEmail()
    .custom(async (email) => {
      await ensureDBConnection();
      if (await LocalUserRegistration.findOne({ email: email })) {
        throw new Error("This email has already been registered for an account");
      }
    }),
];
