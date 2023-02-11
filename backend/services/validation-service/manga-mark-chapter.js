import * as expressValidator from "express-validator";
import MangaPermissionValidator from "./manga-permission.js";
import { ErrorFormatter } from "./mixins/index.js";

const { check } = expressValidator;

export default [
  check("isRead").exists().isBoolean().toBoolean(),
  check("chapters").exists().isArray(),
  MangaPermissionValidator,
  ErrorFormatter,
];
