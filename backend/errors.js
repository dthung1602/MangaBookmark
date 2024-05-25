import { HTTPError } from "got";
import { getLogger, INTERNAL_SERVER_ERROR } from "./services/log-service.js";
const logger = getLogger("error-handler");
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
    logger.error(INTERNAL_SERVER_ERROR, { error: err.message || err + "" });
    res.status(500).json({ "": "Internal server error" });
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
export { ValidationError };
export { PermissionError };
export { NotFoundError };
export { AuthenticationError };
export { CustomError };
export { ErrorHandlerMiddleware };
export { ImageProxyErrorHandlerMiddleware };
export default {
  ValidationError,
  PermissionError,
  NotFoundError,
  AuthenticationError,
  CustomError,
  ErrorHandlerMiddleware,
  ImageProxyErrorHandlerMiddleware,
};
