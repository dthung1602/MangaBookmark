const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20/lib").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const { capitalize } = require("lodash");

const { User } = require("../../models");
const { PermissionError } = require("../../errors");
const UserService = require("../user-service");
const config = require("../../config");

const handler = (authProvider) => async (req, accessToken, refreshToken, profile, done) => {
  const authProviderName = capitalize(authProvider);
  try {
    const action = req.query.state;

    // login
    if (action === "login") {
      const user = await User.findOne({ [`${authProvider}Id`]: profile.id });
      if (user) {
        done(null, user);
      } else {
        done(new PermissionError({ "": `Cannot find account with given ${authProviderName} account` }));
      }
      return;
    }

    // register
    if (action === "register") {
      const user = await UserService.createFromThirdParty(authProvider, profile);
      if (user) {
        done(null, user);
      } else {
        done(new Error(`Cannot register new user with given ${authProviderName} account`));
      }
      return;
    }

    // link account
    let uid = await User.findById(req.user.id);
    const user = await UserService.link(uid, authProvider, profile);
    if (user) {
      done(null, user);
    } else {
      done(new Error(`Cannot link with ${authProviderName} account`));
    }
  } catch (e) {
    done(e);
  }
};

passport.use(
  new GoogleStrategy(
    {
      clientID: config.GOOGLE_AUTH_ID,
      clientSecret: config.GOOGLE_AUTH_PASSWORD,
      callbackURL: "/api/user/google/callback",
      passReqToCallback: true,
    },
    handler("google"),
  ),
);

passport.use(
  new FacebookStrategy(
    {
      clientID: config.FACEBOOK_AUTH_ID,
      clientSecret: config.FACEBOOK_AUTH_PASSWORD,
      callbackURL: "/api/user/facebook/callback",
      passReqToCallback: true,
    },
    handler("facebook"),
  ),
);
