const { validationResult } = require("express-validator");
const { ensureDBConnection } = require("services/db-service");

function redirectHome(req, res) {
  res.redirect("/");
}

function errToJson(errors) {
  const jsonObj = {};
  errors.array().forEach((err) => {
    jsonObj[err.param] = err.msg;
  });
  return jsonObj;
}

function handlerWrapper(handler) {
  return async function (req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json(errToJson(errors));
        return;
      }

      await ensureDBConnection();
      await handler(req, res, next);
    } catch (e) {
      next(e);
    }
  };
}

module.exports = { redirectHome, handlerWrapper };
