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

class NotFoundError extends CustomError {
  static message = "Not found";

  constructor(errors) {
    super(errors, 404);
    this.message = NotFoundError.message;
  }
}

module.exports = {
  ValidationError,
  PermissionError,
  NotFoundError,
  CustomError,
};
