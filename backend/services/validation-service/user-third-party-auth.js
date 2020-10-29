const { query } = require("express-validator");

const ErrorFormatter = require("./validation-error-formatter");

module.exports = [query("action").exists().isIn(["register", "login", "link"]), ErrorFormatter];
