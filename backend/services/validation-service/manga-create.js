import * as expressValidator from "express-validator";
import { Manga } from "../../models/index.js";
import MangaService from "../manga-service/index.js";
import { ErrorFormatter } from "./mixins/index.js";

const { check } = expressValidator;
const { Shelf } = Manga;

export default [
  check("link")
    .exists()
    .trim()
    .isURL()
    .custom(async (link, { req }) => {
      req.parser = MangaService.parsers.getParser(link);
      const manga = await Manga.findOne({ user: req.user.id, link: link });
      if (manga) {
        throw new Error("Manga already existed");
      }
    }),
  check("readChapters")
    .optional()
    .isArray()
    .custom(async (readChapters) => {
      readChapters.forEach((chapLink) => new URL(chapLink));
    }),
  check("nextRereadChapterLink")
    .optional()
    .isURL()
    .custom(async (nextRereadChapterLink, { req }) => {
      if (nextRereadChapterLink !== null && req.body.shelf !== Shelf.REREAD) {
        throw new Error("Next reread chapter is set while shelf is not reread");
      }
    }),
  check("note").optional().trim(),
  check("isCompleted").optional().isBoolean().toBoolean(),
  check("hidden").optional().isBoolean().toBoolean(),
  check("shelf").optional().isIn(Object.values(Shelf)),
  ErrorFormatter,
];
