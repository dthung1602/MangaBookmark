import * as expressValidator from "express-validator";
import MangaService from "../manga-service/index.js";
import { NotFoundError, PermissionError } from "../../errors.js";
import { ErrorFormatter } from "./mixins/index.js";

const { check } = expressValidator;

export default [
  check("manga", "Invalid manga ID")
    .exists()
    .custom(async (mangaID, { req }) => {
      const manga = await MangaService.get(mangaID);
      if (manga === null) {
        throw new NotFoundError();
      }
      if (manga.user.toString() !== req.user.id) {
        throw new PermissionError();
      }
      req.manga = manga;
    }),
  ErrorFormatter,
];
