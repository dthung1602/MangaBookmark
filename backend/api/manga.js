const { Router } = require("@awaitjs/express");
const { pick } = require("lodash");
const router = Router();

const { removeUndefinedAttrs } = require("./utils");
const MangaService = require("../services/manga-service");
const { supportedSites } = require("../services/manga-service/parsers");
const {
  MANGA_FILTER_FIELDS,
  MangaFilterValidator,
  MarkChapterValidator,
  MangaInfoValidator,
  MangaCreateValidator,
  MangaPatchValidator,
  MangaPermissionValidator,
} = require("../services/validation-service");

function handleMangaParsingError(res, e) {
  res.status(400).json({
    errors: {
      link: {
        msg: "Cannot parse manga: " + e,
      },
    },
  });
}

//-----------------------------------
//  Filter & search mangas
//-----------------------------------
/**
 * @swagger
 *
 * /api/mangas:
 *   get:
 *     description: Search & filter mangas
 *     parameters:
 *       - in: query
 *         name: search
 *         description: Search mangas by name
 *         schema:
 *           type: string
 *           required: false
 *       - in: query
 *         name: shelf
 *         schema:
 *           type: array
 *           items:
 *             enum: [to read, reading, waiting, dropped, finished]
 *           required: false
 *       - in: query
 *         name: isCompleted
 *         schema:
 *           type: boolean
 *           required: false
 *       - in: query
 *         name: status
 *         schema:
 *           type: array
 *           items:
 *             type: integer
 *             minimum: 0
 *             maximum: 3
 *           required: false
 *       - in: query
 *         name: hidden
 *         schema:
 *           type: boolean
 *           required: false
 *       - in: query
 *         name: site
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *           required: false
 *       - in: query
 *         name: lang
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *             enum: [en, vi]
 *           required: false
 *       - in: query
 *         name: createdAtGTE
 *         schema:
 *           type: string
 *           format: date
 *           required: false
 *       - in: query
 *         name: createdAtLTE
 *         schema:
 *           type: string
 *           format: date
 *           required: false
 *       - in: query
 *         name: lastReleasedGTE
 *         schema:
 *           type: string
 *           format: date
 *           required: false
 *       - in: query
 *         name: lastReleasedLTE
 *         schema:
 *           type: string
 *           format: date
 *           required: false
 *       - in: query
 *         name: unreadChapCountGTE
 *         schema:
 *           type: string
 *           format: date
 *           required: false
 *       - in: query
 *         name: unreadChapCountLTE
 *         schema:
 *           type: string
 *           format: date
 *           required: false
 *       - in: query
 *         name: tags
 *         schema:
 *           type: string
 *           required: false
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           required: false
 *       - in: query
 *         name: perPage
 *         schema:
 *           type: integer
 *           minimum: 0
 *           description: If set to 0, all pages are retrieved.
 *           required: false
 *       - in: query
 *         name: sort
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *           description: The field name to sort. Add - to sort desc. This field can be a string of one filed
 *                        a string of multiple fields separated by space, or an array of string.
 *           required: false
 *     responses:
 *       200:
 *         description: Retrieved successfully
 *         content:
 *           application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  data:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/Manga'
 *                  page:
 *                    type: integer
 *                  totalItem:
 *                    type: integer
 *                  totalPage:
 *                    type: integer
 */
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
/**
 * @swagger
 *
 * /api/mangas:
 *   post:
 *     description: Create new manga
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               link:
 *                 type: string
 *                 format: uri
 *               readChapters:
 *                 type: array
 *                 required: false
 *                 items:
 *                   type: string
 *                   format: url
 *               note:
 *                 type: string
 *                 required: false
 *               isCompleted:
 *                 type: boolean
 *                 required: false
 *               hidden:
 *                 type: boolean
 *                 required: false
 *               shelf:
 *                 type: string
 *                 enum: [to read, reading, waiting, dropped, finished]
 *                 required: false
 *     responses:
 *       201:
 *         description: Manga created successfully
 *         content:
 *           application/json:
 *              schema:
 *                $ref: '#/components/schemas/Manga'
 */
router.postAsync("/", MangaCreateValidator, async (req, res) => {
  try {
    const manga = await MangaService.create({ ...req.body, user: req.user.id }, req.parser);
    res.status(201).json(manga);
  } catch (e) {
    handleMangaParsingError(res, e);
  }
});

//-----------------------------------
//  Edit manga
//-----------------------------------
/**
 * @swagger
 *
 * /api/mangas/{mangaId}:
 *   patch:
 *     description: Edit manga
 *     parameters:
 *       - in: path
 *         name: mangaId
 *         schema:
 *           $ref: '#/components/schemas/Id'
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               note:
 *                 type: string
 *                 required: false
 *               isCompleted:
 *                 type: boolean
 *                 required: false
 *               hidden:
 *                 type: boolean
 *                 required: false
 *               shelf:
 *                 type: string
 *                 enum: [to read, reading, waiting, dropped, finished]
 *                 required: false
 *     responses:
 *       200:
 *         description: Manga edited successfully
 *         content:
 *           application/json:
 *              schema:
 *                $ref: '#/components/schemas/Manga'
 */
router.patchAsync("/:manga", MangaPatchValidator, async (req, res) => {
  let manga = await MangaService.patch(req.manga, req.body);
  res.json(manga);
});

//-----------------------------------
//  Delete manga
//-----------------------------------
/**
 * @swagger
 *
 * /api/mangas/{mangaId}:
 *   delete:
 *     description: Delete manga
 *     parameters:
 *       - in: path
 *         name: mangaId
 *         schema:
 *           $ref: '#/components/schemas/Id'
 *     responses:
 *       204:
 *         description: Deleted successfully
 */
router.deleteAsync("/:manga", MangaPermissionValidator, async (req, res) => {
  await MangaService.delete(req.manga);
  res.sendStatus(204);
});

//-----------------------------------
//  Get manga info from link
//-----------------------------------
/**
 * @swagger
 *
 * /api/mangas/info:
 *   get:
 *     description: Get live manga info. This manga might NOT be in the database.
 *     parameters:
 *       - in: query
 *         name: link
 *         schema:
 *           type: string
 *           format: uri
 *           required: true
 *     responses:
 *       200:
 *         description: Get info successfully
 *         content:
 *           application/json:
 *              schema:
 *                $ref: '#/components/schemas/MangaInfo'
 */
router.getAsync("/info", MangaInfoValidator, async (req, res) => {
  try {
    const manga = await req.parser.parseManga(req.query.link);
    res.json(manga);
  } catch (e) {
    handleMangaParsingError(res, e);
  }
});

//-----------------------------------
//  Mark chapters as read / unread
//-----------------------------------
/**
 * @swagger
 *
 * /api/mangas/{mangaId}/mark-chapters:
 *   patch:
 *     description: Update chapter isRead status
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               isRead:
 *                 type: boolean
 *                 required: true
 *               chapters:
 *                 type: array
 *                 required: true
 *                 items:
 *                   type: string
 *                   format: uri
 *     responses:
 *       201:
 *         description: Chapters marked successfully
 *         content:
 *           application/json:
 *              schema:
 *                $ref: '#/components/schemas/Manga'
 */
router.postAsync("/:manga/mark-chapters", MarkChapterValidator, async (req, res) => {
  const { chapters, isRead } = req.body;
  let { manga } = req;
  manga = await MangaService.markChapters(manga, isRead, chapters);
  res.json(manga);
});

//-----------------------------------
//  Check one manga for new updates
//-----------------------------------
/**
 * @swagger
 *
 * /api/mangas/{mangaId}/update:
 *   post:
 *     description: Update this manga
 *     parameters:
 *       - in: path
 *         name: mangaId
 *         schema:
 *           $ref: '#/components/schemas/Id'
 *     responses:
 *       200:
 *         description: Updated successfully
 *         content:
 *           application/json:
 *              schema:
 *                $ref: '#/components/schemas/Manga'
 */
router.postAsync("/:manga/update", MangaPermissionValidator, async (req, res) => {
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
/**
 * @swagger
 *
 * /api/mangas/update-multiple:
 *   get:
 *     description: Update mangas found by search & filters
 *     parameters:
 *       - in: query
 *         name: search
 *         description: Search mangas by name
 *         schema:
 *           type: string
 *           required: false
 *       - in: query
 *         name: shelf
 *         schema:
 *           type: array
 *           items:
 *             enum: [to read, reading, waiting, dropped, finished]
 *           required: false
 *       - in: query
 *         name: isCompleted
 *         schema:
 *           type: boolean
 *           required: false
 *       - in: query
 *         name: status
 *         schema:
 *           type: array
 *           items:
 *             type: integer
 *             minimum: 0
 *             maximum: 3
 *           required: false
 *       - in: query
 *         name: hidden
 *         schema:
 *           type: boolean
 *           required: false
 *       - in: query
 *         name: site
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *           required: false
 *       - in: query
 *         name: lang
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *             enum: [en, vi]
 *           required: false
 *       - in: query
 *         name: createdAtGTE
 *         schema:
 *           type: string
 *           format: date
 *           required: false
 *       - in: query
 *         name: createdAtLTE
 *         schema:
 *           type: string
 *           format: date
 *           required: false
 *       - in: query
 *         name: lastReleasedGTE
 *         schema:
 *           type: string
 *           format: date
 *           required: false
 *       - in: query
 *         name: lastReleasedLTE
 *         schema:
 *           type: string
 *           format: date
 *           required: false
 *       - in: query
 *         name: unreadChapCountGTE
 *         schema:
 *           type: string
 *           format: date
 *           required: false
 *       - in: query
 *         name: unreadChapCountLTE
 *         schema:
 *           type: string
 *           format: date
 *           required: false
 *       - in: query
 *         name: tags
 *         schema:
 *           type: string
 *           required: false
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           required: false
 *       - in: query
 *         name: perPage
 *         schema:
 *           type: integer
 *           minimum: 0
 *           description: If set to 0, all pages are retrieved.
 *           required: false
 *     responses:
 *       200:
 *         description: Update completed
 *         content:
 *           application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  total:
 *                    type: integer
 *                    description: number of updated mangas
 *                  success:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/MangaUpdateReport'
 *                  fail:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/MangaUpdateReport'
 */
router.postAsync("/update-multiple", MangaFilterValidator, async (req, res) => {
  const filters = removeUndefinedAttrs({
    user: req.user.id,
    shelf: req.body.shelf,
    hidden: req.body.hidden,
    isCompleted: req.body.isCompleted,
  });
  const { data: mangas } = await MangaService.list(filters, undefined, undefined, 0, 0);
  const { successMangas, failMangas } = await MangaService.updateMultiple(mangas, false, true);
  const reportFields = ["name", "_id", "site", "link", "newChapCount"];
  res.json({
    total: mangas.length,
    success: successMangas.map((manga) => pick(manga, reportFields)),
    fail: failMangas.map((manga) => pick(manga, reportFields)),
  });
});

//-----------------------------------
//  Get all supported manga sites
//-----------------------------------
/**
 * @swagger
 *
 * /api/mangas/supported-sites:
 *   get:
 *     description: Get all supported manga sites
 *     responses:
 *       200:
 *         description: Retrieved successfully
 *         content:
 *           application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/MangaSite'
 */
router.getAsync("/supported-sites", async (req, res) => {
  res.json(supportedSites);
});

module.exports = router;
