const { validationResult } = require("express-validator");
const { ValidationError, PermissionError, NotFoundError } = require("../../errors");

module.exports = function (req, res, next) {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    errors = errors.mapped();

    for (let [field, detail] of Object.entries(errors)) {
      if (detail.msg === PermissionError.message) {
        throw new PermissionError({ [field]: detail });
      }
      if (detail.msg === NotFoundError.message) {
        throw new NotFoundError({ [field]: detail });
      }
    }

    throw new ValidationError(errors);
  }
  next();
};
