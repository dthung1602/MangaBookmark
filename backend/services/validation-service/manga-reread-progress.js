import * as expressValidator from "express-validator";
import { Manga } from "../../models/index.js";
import MangaPermissionValidator from "./manga-permission.js";
import { ErrorFormatter } from "./mixins/index.js";
import { ValidationError } from "../../errors.js";

const { check } = expressValidator;

export default [
  MangaPermissionValidator,
  (req, res, next) => {
    if (req.manga.shelf === Manga.Shelf.REREAD) {
      next();
    } else {
      next(new ValidationError("Manga must be in reread shelf"));
    }
  },
  check("nextRereadChapterLink")
    .exists()
    .trim()
    .custom(async (nextRereadChapterLink, { req }) => {
      if (nextRereadChapterLink === "") {
        return;
      }
      try {
        new URL(nextRereadChapterLink);
      } catch (e) {
        throw ValidationError("Invalid URL");
      }
      const idx = req.manga.chapters.find((ch) => ch.link === nextRereadChapterLink);
      if (idx === -1) {
        throw new ValidationError("Cannot find chapter");
      }
    }),
  ErrorFormatter,
];
