const { ensureDBConnection } = require("./services/db-service");
const { ValidationError } = require("./exceptions");

const DBConnectionMiddleware = async (req, res, next) => {
  await ensureDBConnection();
  next();
};

const AuthenticateMiddleware = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.status(403).send("Please login and try again");
  }
};

const ErrorHandler = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    res.status(err.number).json({ errors: err.errors });
    next();
  } else {
    const code = err.number || 500;
    const message = err.message || "Unknown error";
    res.status(code).json({ "": message });
  }
};

module.exports = {
  DBConnectionMiddleware,
  AuthenticateMiddleware,
  ErrorHandler,
};
