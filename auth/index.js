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

module.exports = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.status(403).send("Please login and try again");
  }
};
