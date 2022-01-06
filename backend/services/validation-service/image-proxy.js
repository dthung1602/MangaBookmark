const { check } = require("express-validator");

const { supportedSites } = require("../manga-service/parsers");
const { ErrorFormatter } = require("./mixins");

const mangaSites = supportedSites.map((s) => s.name);

const ImageProxyValidator = [
  check("url").exists().isURL(),
  check("mangaSite").optional().isIn(mangaSites),
  ErrorFormatter,
];

module.exports = ImageProxyValidator;
