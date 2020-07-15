const { validationResult } = require("express-validator");
const { ValidationError } = require("../../exceptions");

module.exports = function (req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ValidationError(errors.mapped());
  }
  next();
};
