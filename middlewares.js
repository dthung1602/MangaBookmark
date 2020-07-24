const { ensureDBConnection } = require("./services/db-service");
const { CustomError, PermissionError } = require("./exceptions");

const DBConnectionMiddleware = async (req, res, next) => {
  await ensureDBConnection();
  next();
};

const AuthenticateMiddleware = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    throw new PermissionError({ user: { msg: "Authentication required" } });
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
