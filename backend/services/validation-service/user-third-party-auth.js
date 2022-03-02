const { query } = require("express-validator");

const { ErrorFormatter } = require("./mixins");

module.exports = [query("action").exists().isIn(["register", "login", "link"]), ErrorFormatter];
