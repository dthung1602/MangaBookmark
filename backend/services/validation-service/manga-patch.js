import * as expressValidator from "express-validator";
import { Manga } from "../../models/index.js";
import MangaPermissionValidator from "./manga-permission.js";
import { ErrorFormatter } from "./mixins/index.js";

const { check } = expressValidator;
const { Shelf } = Manga;

export default [
  check("shelf").optional().isIn(Object.values(Shelf)),
  check("note").optional().trim(),
  check("isCompleted").optional().isBoolean().toBoolean(),
  check("hidden").optional().isBoolean().toBoolean(),
  check("nextRereadChapter").optional().trim().isURL(),
  MangaPermissionValidator,
  ErrorFormatter,
];
