import * as expressValidator from "express-validator";
import MangaService from "../manga-service/index.js";
import { ErrorFormatter } from "./mixins/index.js";

const { check } = expressValidator;

export default [
  check("link")
    .exists()
    .custom(async (link, { req }) => {
      req.parser = MangaService.parsers.getParser(link);
    }),
  ErrorFormatter,
];
