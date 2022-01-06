const { Router } = require("@awaitjs/express");
const router = Router();

const { OmnisearchUserMangaResult } = require("../models");
const { OmnisearchUserMangaValidator, OmnisearchScanlationMangaValidator } = require("../services/validation-service");
const MangaService = require("../services/manga-service");
const ScanlationSiteService = require("../services/scanlation-site-searching-service");

//---------------------------------------
//  Search in user mangas
//---------------------------------------
/**
 * @swagger
 *
 * /api/omnisearch/user-manga:
 *   get:
 *     description: Search for user manga
 *     parameters:
 *       - in: query
 *         name: search
 *         description: Search mangas by name
 *         schema:
 *           type: string
 *           required: true
 *       - in: query
 *         name: topN
 *         description: How many results to fetch
 *         schema:
 *           type: integer
 *           minimum: 1
 *           required: false
 *           default: 3
 *     responses:
 *       200:
 *         description: Retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/OmnisearchResult'
 */
router.getAsync("/user-manga", OmnisearchUserMangaValidator, async (req, res) => {
  let result = await MangaService.list({ user: req.user.id }, req.query.search, undefined, 1, req.query.topN);
  result = result.data.map((manga) => new OmnisearchUserMangaResult(manga));
  res.json(result);
});

//---------------------------------------
//  Search on scanlation sites
//---------------------------------------
/**
 * @swagger
 *
 * /api/omnisearch/scanlation-manga:
 *   get:
 *     description: Search for mangas on scanlation sites
 *     parameters:
 *       - in: query
 *         name: search
 *         description: Search mangas by name
 *         schema:
 *           type: string
 *           required: true
 *       - in: query
 *         name: topN
 *         description: How many results to fetch
 *         schema:
 *           type: integer
 *           minimum: 1
 *           required: false
 *           default: 3
 *       - in: query
 *         name: sites
 *         description: scanlation sites to search
 *         schema:
 *           type: string
 *           required: false
 *     responses:
 *       200:
 *         description: Retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/OmnisearchResult'
 */
router.getAsync("/scanlation-manga", OmnisearchScanlationMangaValidator, async (req, res) => {
  const sitesToSearch = req.query.sites || ScanlationSiteService.supportedSites;
  const result = await ScanlationSiteService.searchMultipleSites(sitesToSearch, req.query.search, req.query.topN);
  res.json(result);
});

module.exports = router;
