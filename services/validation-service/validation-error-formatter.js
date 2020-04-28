const { validationResult } = require("express-validator");
const { ValidationError } = require("../../exceptions");

module.exports = function (req, res, next) {
  console.log("Validation Error formatter");
  const errors = validationResult(req);
  console.error(errors.mapped());
  if (!errors.isEmpty()) {
    throw new ValidationError(errors.mapped());
  }
  next();
};
