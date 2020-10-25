const { check } = require("express-validator");

const ErrorFormatter = require("./validation-error-formatter");

module.exports = [check("authProvider").exists().isIn(["register", "login", "link"]), ErrorFormatter];
