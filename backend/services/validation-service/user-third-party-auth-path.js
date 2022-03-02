const { check } = require("express-validator");

const { ErrorFormatter } = require("./mixins");

module.exports = [check("authProvider").exists().isIn(["register", "login", "link"]), ErrorFormatter];
