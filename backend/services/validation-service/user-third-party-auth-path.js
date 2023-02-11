const { check } = require("express-validator");

const { ErrorFormatter } = require("./mixins");

export default [check("authProvider").exists().isIn(["register", "login", "link"]), ErrorFormatter];
