const passport = require("passport/lib");

require("./Google");
require("./Facebook");
require("./Local");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  done(null, { id: userId });
});

module.exports = {
  authenticate: passport.authenticate,
};
