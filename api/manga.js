const express = require("express");
const router = express.Router();
const { handlerWrapper } = require("./utils");
const {
  MarkChapterValidator,
  MangaFilterValidator,
  MangaInfoValidator,
  MangaCreateValidator,
  MangaPatchValidator,
  MangaPermissionValidator,
} = require("services/validation-service");
const MangaService = require("services/manga-service");

//-----------------------------------
//  Filter & search mangas
//-----------------------------------

router.get(
  "/",
  MangaFilterValidator,
  handlerWrapper(async (req, res) => {
    const filters = {
      user: req.user.id,
      following: req.query.following,
      hidden: req.query.hidden,
      search: req.query.search,
    };

    const mangas = await MangaService.list(
      filters,
      req.query.search,
      req.query.sort,
      req.query.page,
      req.query.perPage,
    );

    res.json(mangas);
  }),
);

//-----------------------------------
//  Create manga
//-----------------------------------

router.post(
  "/",
  MangaCreateValidator,
  handlerWrapper(async (req, res) => {
    try {
      const manga = await MangaService.create({ ...req.body, userID: req.user.id });
      res.json(manga);
    } catch (e) {
      res.status(400).json({ link: "Cannot parse manga" });
    }
  }),
);

//-----------------------------------
//  Edit manga
//-----------------------------------

router.patch(
  "/",
  MangaPatchValidator,
  handlerWrapper(async (req, res) => {
    await MangaService.patch(req.manga, req.body);
    res.json({});
  }),
);

//-----------------------------------
//  Delete manga
//-----------------------------------

router.delete(
  "/",
  MangaPermissionValidator,
  handlerWrapper(async (req, res) => {
    await MangaService.delete(req.manga);
    res.json({});
  }),
);

//-----------------------------------
//  Get manga info from link
//-----------------------------------

router.get(
  "/info",
  MangaInfoValidator,
  handlerWrapper(async (req, res) => {
    try {
      const manga = await req.parser.parseManga(req.query.link);
      res.json(manga);
    } catch (e) {
      res.status(400).json({ link: "Cannot parse manga: " + e });
    }
  }),
);

//-----------------------------------
//  Mark chapters as read / unread
//-----------------------------------

router.post(
  "/mark-chapters",
  MarkChapterValidator,
  handlerWrapper(async (req, res) => {
    const { chapters, isRead } = req.body;
    const { manga } = req;
    MangaService.markChapters(manga, isRead, chapters);
    res.json({});
  }),
);

//-----------------------------------
//  Check 1 manga for new updates
//-----------------------------------

router.post(
  "/update",
  MangaPermissionValidator,
  handlerWrapper(async (req, res) => {
    try {
      const manga = await MangaService.update(req.manga);
      res.json(manga);
    } catch (e) {
      res.status(400).send("Fail to update manga.").end();
    }
  }),
);

//------------------------------------------
//  Check multiple mangas for new updates
//------------------------------------------

router.post(
  "/update-multiple",
  MangaFilterValidator,
  handlerWrapper(async (req, res) => {
    const filters = {
      user: req.user.id,
      following: req.body.following,
      hidden: req.body.hidden,
      isCompleted: req.body.isCompleted,
    };
    const mangas = await MangaService.list(filters);
    const result = await MangaService.updateMultiple(mangas);
    res.json({
      total: mangas.length,
      success: result.map((manga) => manga.name),
    });
  }),
);

module.exports = router;
