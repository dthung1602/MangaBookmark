import { MangaFilterValidator } from "./manga-filter.js";
import { getMangaUpdateStatusMemo } from "../../datasource/index.js";
import { ValidationError } from "../../errors.js";
import { updateMultiple } from "../manga-service/index.js";

export default [
  (req, res, next) => {
    getMangaUpdateStatusMemo()
      .get(req.user.id)
      .then((status) => {
        if (status === updateMultiple.ProcessStatuses.PROCESSING) {
          next(new ValidationError("Last update job has not finished yet"));
        } else {
          next();
        }
      });
  },
  ...MangaFilterValidator,
];
