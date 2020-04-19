const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const { User } = require("../models");
const { ensureDBConnection } = require("services/db-service");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    await ensureDBConnection();
    User.findOne({ username: username }, (err, user) => {
      if (err) {
        return done(err, false);
      }
      if (!user) {
        return done(null, false, { username: "Incorrect username" });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { password: "Incorrect password" });
      }
      return done(null, user);
    });
  }),
);
