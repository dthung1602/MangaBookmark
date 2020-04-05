const { connectToDB, Manga } = require("../models");
const { validationResult, check } = require("express-validator");

const checkMangaPermission = check("manga", "Invalid manga ID")
  .exists()
  .custom(async (mangaID, { req }) => {
    connectToDB();
    const manga = await Manga.findById(mangaID);
    if (manga === null || manga.user.toString() !== req.user.id)
      throw new Error("Cannot find manga");
    req.manga = manga;
  });

function redirectHome(req, res) {
  res.redirect("/");
}

function errToJson(errors) {
  const jsonObj = {};
  errors.array().forEach((err) => {
    jsonObj[err.param] = err.msg;
  });
  return jsonObj;
}

function handlerWrapper(handler) {
  return async function (req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json(errToJson(errors));
        return;
      }

      await connectToDB();
      await handler(req, res, next);
    } catch (e) {
      next(e);
    }
  };
}

module.exports = { checkMangaPermission, redirectHome, handlerWrapper };
