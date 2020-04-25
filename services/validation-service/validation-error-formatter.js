const { validationResult } = require("express-validator");
const { ValidationError } = require("exceptions");

module.exports = function (req) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const dict = {};
    errors.array().forEach((err) => {
      dict[err.param] = err.msg;
    });
    throw ValidationError(dict);
  }
};
