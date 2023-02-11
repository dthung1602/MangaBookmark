import * as expressValidator from "express-validator";
import { supportedSites } from "../manga-service/parsers/index.js";
import { ErrorFormatter } from "./mixins/index.js";

const { check } = expressValidator;
const mangaSites = supportedSites.map((s) => s.name);

const ImageProxyValidator = [
  check("url").exists().isURL(),
  check("mangaSite").optional().isIn(mangaSites),
  ErrorFormatter,
];

export default ImageProxyValidator;
