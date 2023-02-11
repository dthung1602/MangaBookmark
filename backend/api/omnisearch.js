import { Router } from "@awaitjs/express";

import { OmnisearchUserMangaResult } from "../models/index.js";
import {
  OmnisearchUserMangaValidator,
  OmnisearchScanlationMangaValidator,
} from "../services/validation-service/index.js";
import { ensureIsArray } from "../services/utils/index.js";
import MangaService from "../services/manga-service/index.js";
import ScanlationSiteService from "../services/scanlation-site-searching-service/index.js";

const router = Router();

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
 *           type: array
 *           required: false
 *           items:
 *             type: string
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
  const sitesToSearch =
    req.query.sites === undefined ? ScanlationSiteService.supportedSites : ensureIsArray(req.query.sites);
  const result = await ScanlationSiteService.searchMultipleSites(sitesToSearch, req.query.search, req.query.topN);
  res.json(result);
});

export default router;
