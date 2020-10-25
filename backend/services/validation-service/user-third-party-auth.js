const { check } = require("express-validator");

const ErrorFormatter = require("./validation-error-formatter");

module.exports = [check("action").exists().isIn(["register", "login", "link"]), ErrorFormatter];
