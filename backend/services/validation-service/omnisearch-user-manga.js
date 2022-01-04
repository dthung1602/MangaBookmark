const { check } = require("express-validator");

const Pagination = require("./pagination");
const ErrorFormatter = require("./validation-error-formatter");

module.exports = [check("search").exists(), ...Pagination, ErrorFormatter];
