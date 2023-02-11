import * as expressValidator from "express-validator";
import { Manga } from "../../models/index.js";
import { PaginationMixin, SortMixin } from "./mixins/index.js";
import { ErrorFormatter } from "./mixins/index.js";
const { check } = expressValidator;
const MangaFilterValidator = [
  check("search").optional().trim(),
  check("shelf.*").optional().isIn(Object.values(Manga.Shelf)),
  check("isCompleted").optional().isBoolean().toBoolean(),
  check("status.*").optional().isInt({ min: 0, max: 3 }).toInt(),
  check("hidden").optional().isBoolean().toBoolean(),
  check("site.*").optional(),
  check("lang.*").optional().isIn(Object.values(Manga.Language)),
  check("createdAtGTE").optional().isDate(),
  check("createdAtLTE").optional().isDate(),
  check("lastReleasedGTE").optional().isDate(),
  check("lastReleasedLTE").optional().isDate(),
  check("unreadChapCountGTE").optional().isInt().toInt(),
  check("unreadChapCountLTE").optional().isInt().toInt(),
  check("tags.*").optional().trim(),
  check("chapters.link").optional().trim().isURL(),
  ...PaginationMixin,
  ...SortMixin,
  ErrorFormatter,
];

const MANGA_FILTER_FIELDS = [
  "shelf",
  "isCompleted",
  "status",
  "hidden",
  "site",
  "lang",
  "createdAtGTE",
  "createdAtLTE",
  "lastReleasedGTE",
  "lastReleasedLTE",
  "unreadChapCountGTE",
  "unreadChapCountLTE",
  "tags",
  "chapters.link",
];

export { MangaFilterValidator, MANGA_FILTER_FIELDS };
export default {
  MangaFilterValidator,
  MANGA_FILTER_FIELDS,
};
