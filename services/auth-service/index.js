const passport = require("passport");

require("./Google");
require("./Facebook");
require("./Local");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  done(null, { id: userId });
});
