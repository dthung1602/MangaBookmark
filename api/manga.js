const { Router } = require("@awaitjs/express");
const { pick } = require("lodash");
const router = Router();

const { removeUndefinedAttrs } = require("./utils");
const MangaService = require("../services/manga-service");
const {
  MANGA_FILTER_FIELDS,
  MangaFilterValidator,
  MarkChapterValidator,
  MangaInfoValidator,
  MangaCreateValidator,
  MangaPatchValidator,
  MangaPermissionValidator,
} = require("../services/validation-service");

//-----------------------------------
//  Filter & search mangas
//-----------------------------------

router.getAsync("/", MangaFilterValidator, async (req, res) => {
  const filters = {
    user: req.user.id,
    ...pick(req.query, MANGA_FILTER_FIELDS),
  };

  const mangas = await MangaService.list(filters, req.query.search, req.query.sort, req.query.page, req.query.perPage);

  res.json(mangas);
});

//-----------------------------------
//  Create manga
//-----------------------------------

router.postAsync("/", MangaCreateValidator, async (req, res) => {
  try {
    const manga = await MangaService.create({ ...req.body, userID: req.user.id });
    res.status(201).json(manga);
  } catch (e) {
    res.status(400).json({ link: "Cannot parse manga" });
  }
});

//-----------------------------------
//  Edit manga
//-----------------------------------

router.patchAsync("/", MangaPatchValidator, async (req, res) => {
  await MangaService.patch(req.manga, req.body);
  res.sendStatus(204);
});

//-----------------------------------
//  Delete manga
//-----------------------------------

router.deleteAsync("/", MangaPermissionValidator, async (req, res) => {
  await MangaService.delete(req.manga);
  res.sendStatus(204);
});

//-----------------------------------
//  Get manga info from link
//-----------------------------------

router.getAsync("/info", MangaInfoValidator, async (req, res) => {
  try {
    const manga = await req.parser.parseManga(req.query.link);
    res.json(manga);
  } catch (e) {
    res.status(400).json({ link: "Cannot parse manga: " + e });
  }
});

//-----------------------------------
//  Mark chapters as read / unread
//-----------------------------------

router.postAsync("/mark-chapters", MarkChapterValidator, async (req, res) => {
  const { chapters, isRead } = req.body;
  const { manga } = req;
  await MangaService.markChapters(manga, isRead, chapters);
  res.sendStatus(204);
});

//-----------------------------------
//  Check one manga for new updates
//-----------------------------------

router.postAsync("/update", MangaPermissionValidator, async (req, res) => {
  try {
    const manga = await MangaService.update(req.manga);
    res.json(manga);
  } catch (e) {
    res.status(400).send("Fail to update manga.").end();
  }
});

//------------------------------------------
//  Check multiple mangas for new updates
//------------------------------------------

router.postAsync("/update-multiple", MangaFilterValidator, async (req, res) => {
  const filters = removeUndefinedAttrs({
    user: req.user.id,
    following: req.body.following,
    hidden: req.body.hidden,
    isCompleted: req.body.isCompleted,
  });
  const { data: mangas } = await MangaService.list(filters, undefined, undefined, 0, 0);
  const { successMangas, failMangas } = await MangaService.updateMultiple(mangas);
  const reportFields = ["name", "_id", "source"];
  res.json({
    total: mangas.length,
    success: successMangas.map((manga) => pick(manga, reportFields)),
    fail: failMangas.map((manga) => pick(manga, reportFields)),
  });
});

module.exports = router;
