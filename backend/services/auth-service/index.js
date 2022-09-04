const passport = require("passport");

const { AuthenticationError } = require("../../errors");
const { noLoginPaths, basicAuthPaths } = require("./authenticate.config");
const { SERVICE_API_TOKEN } = require("../../config");
require("./ThirdParty");
require("./Local");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  done(null, { id: userId });
});

const requireNormalLogin = (path, method) => {
  for (let [pathRegex, methodRegex] of noLoginPaths) {
    if (path.match(pathRegex) && method.match(methodRegex)) {
      return false;
    }
  }
  return true;
};

const requireBasicAuth = (path, method) => {
  for (let [pathRegex, methodRegex] of basicAuthPaths) {
    if (path.match(pathRegex) && method.match(methodRegex)) {
      return true;
    }
  }
  return false;
};

const validBasicAuth = (req) => {
  console.log(">>> " + JSON.stringify(req.headers));
  console.log(">>> " + req.headers.authorization);
  console.log(">>> " + req.headers["authorization"]);
  console.log(">>> " + req.headers["Authorization"]);
  return req.headers.authorization === SERVICE_API_TOKEN;
};

const AuthenticateMiddleware = (req, res, next) => {
  const path = req.baseUrl + req.path; // https://stackoverflow.com/a/56380963/7342188
  const method = req.method;

  if (requireBasicAuth(path, method)) {
    if (validBasicAuth(req)) {
      return next();
    }
    throw new AuthenticationError({ user: { msg: "Invalid basic auth token" } });
  }

  if (!req.user && requireNormalLogin(path, method)) {
    throw new AuthenticationError({ user: { msg: "Authentication required" } });
  } else {
    next();
  }
};

module.exports = { AuthenticateMiddleware };
