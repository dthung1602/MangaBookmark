const { MangaFilterValidator } = require("./manga-filter");
const { getMangaUpdateStatusMemo } = require("../../datasource");
const { ValidationError } = require("../../errors");
const {
  updateMultiple: { ProcessStatuses },
} = require("../manga-service");

module.exports = [
  (req, res, next) => {
    getMangaUpdateStatusMemo()
      .get(req.user.id)
      .then((status) => {
        if (status === ProcessStatuses.PROCESSING) {
          next(new ValidationError("Last update job has not finished yet"));
        } else {
          next();
        }
      });
  },
  ...MangaFilterValidator,
];
