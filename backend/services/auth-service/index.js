import passport from "passport";

import { AuthenticationError } from "../../errors.js";
import { noLoginPaths, requireAuthViaTokenPaths } from "./authenticate-config.js";
import { SERVICE_API_TOKEN } from "../../config.js";
import "./third-party.js";
import "./local.js";

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

const requireAuthViaToken = (path, method) => {
  for (let [pathRegex, methodRegex] of requireAuthViaTokenPaths) {
    if (path.match(pathRegex) && method.match(methodRegex)) {
      return true;
    }
  }
  return false;
};

const validToken = (req) => {
  return req.headers["x-service-api-token"] === SERVICE_API_TOKEN;
};

const AuthenticateMiddleware = (req, res, next) => {
  const path = req.baseUrl + req.path; // https://stackoverflow.com/a/56380963/7342188
  const method = req.method;
  if (requireAuthViaToken(path, method)) {
    if (validToken(req)) {
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

export { AuthenticateMiddleware };
export default {
  AuthenticateMiddleware,
};
