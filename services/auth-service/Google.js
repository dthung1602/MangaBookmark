const passport = require("passport/lib");
const { get } = require("lodash");
const GoogleStrategy = require("passport-google-oauth20/lib").Strategy;

const { User } = require("../models");
const config = require("../config");
passport.use(
  new GoogleStrategy(
    {
      clientID: config.GOOGLE_AUTH_ID,
      clientSecret: config.GOOGLE_AUTH_PASSWORD,
      callbackURL: "/auth/google/callback",
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      // check if user already exists in our own db
      const googleUser = await User.findOne({ googleId: profile.id });

      // found -> login
      if (googleUser) {
        done(null, googleUser);
        return;
      }

      // not found:
      //    user has login -> link account
      //    else ->  create user
      const user = req.user ? await User.findById(req.user.id) : new User({ primaryAccount: "google" });

      user.googleId = profile.id;
      user.googlePic = get(profile, "photos[0].value");
      user.googleName = profile.displayName;
      if (!user.email) {
        user.email = get(profile, "emails[0].value");
      }

      await user.save();
      done(null, user);
    },
  ),
);
