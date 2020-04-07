const passport = require("passport/lib");
const FacebookStrategy = require("passport-facebook").Strategy;

const { User, connectToDB } = require("../models");
const config = require("../config");

passport.use(
  new FacebookStrategy(
    {
      clientID: config.FACEBOOK_AUTH_ID,
      clientSecret: config.FACEBOOK_AUTH_PASSWORD,
      callbackURL: "/auth/facebook/callback",
      profileFields: ["id", "email", "displayName", "picture"],
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      connectToDB();

      // check if user already exists in our own db
      const facebookUser = await User.findOne({ facebookId: profile.id });

      // found -> login
      if (facebookUser) {
        done(null, facebookUser);
        return;
      }

      // not found:
      //    user has login -> link account
      //    else ->  create user
      const user = req.user ? await User.findById(req.user.id) : new User({ primaryAccount: "facebook" });

      user.facebookId = profile.id;
      user.facebookPic = profile.photos[0].value;
      user.facebookName = profile.displayName;
      if (!user.email) {
        user.email = profile.emails[0].value;
      }

      await user.save();
      done(null, user);
    },
  ),
);
