const { ensureDBConnection } = require("./services/db-service");
const { CustomError } = require("./exceptions");

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
  if (err instanceof CustomError) {
    res.status(err.statusCode).json({ errors: err.errors });
    next();
  } else {
    const message = err.message || "Internal server error";
    res.status(500).json({ "": message });
  }
};

module.exports = {
  DBConnectionMiddleware,
  AuthenticateMiddleware,
  ErrorHandler,
};
