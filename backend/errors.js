const { HTTPError } = require("got");

class CustomError extends Error {
  constructor(errors, statusCode) {
    super();
    this.errors = errors;
    this.statusCode = statusCode;
  }
}

class ValidationError extends CustomError {
  constructor(errors) {
    super(errors, 400);
  }
}

class PermissionError extends CustomError {
  static message = "Permission denied";

  constructor(errors) {
    super(errors, 403);
    this.message = PermissionError.message;
  }
}

class AuthenticationError extends CustomError {
  static message = "Authentication required";

  constructor(errors) {
    super(errors, 401);
    this.message = AuthenticationError.message;
  }
}

class NotFoundError extends CustomError {
  static message = "Not found";

  constructor(errors) {
    super(errors, 404);
    this.message = NotFoundError.message;
  }
}

// eslint-disable-next-line no-unused-vars
const ErrorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomError) {
    res.status(err.statusCode).json({ errors: err.errors });
  } else {
    const message = err.message || "Internal server error";
    res.status(500).json({ "": message });
  }
};

// eslint-disable-next-line no-unused-vars
const ImageProxyErrorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof HTTPError) {
    res.sendStatus(err.response.statusCode);
  } else {
    next(err);
  }
};

module.exports = {
  ValidationError,
  PermissionError,
  NotFoundError,
  AuthenticationError,
  CustomError,
  ErrorHandlerMiddleware,
  ImageProxyErrorHandlerMiddleware,
};
