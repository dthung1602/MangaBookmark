const passport = require("passport");

const { AuthenticationError } = require("../../errors");
const { noLoginPaths } = require("./authenticate.config");
require("./Google");
require("./Facebook");
require("./Local");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  done(null, { id: userId });
});

const requireLogin = (path, method) => {
  for (let [pathRegex, methodRegex] of noLoginPaths) {
    if (path.match(pathRegex) && method.match(methodRegex)) {
      return false;
    }
  }
  return true;
};

const AuthenticateMiddleware = (req, res, next) => {
  const path = req.baseUrl + req.path; // https://stackoverflow.com/a/56380963/7342188
  if (!req.user && requireLogin(path, req.method)) {
    throw new AuthenticationError({ user: { msg: "Authentication required" } });
  } else {
    next();
  }
};

module.exports = { AuthenticateMiddleware };
