import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { User } from "../../models/index.js";

passport.use(
  "local",
  new LocalStrategy({}, async (username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) {
        return done(err, false);
      }
      if (!user) {
        return done(null, false, {
          username: {
            value: username,
            msg: "Incorrect username",
            param: "username",
            location: "body",
          },
        });
      }
      if (!user.validPassword(password)) {
        return done(null, false, {
          password: {
            value: "",
            msg: "Incorrect password",
            param: "password",
            location: "body",
          },
        });
      }
      return done(null, user);
    });
  }),
);
