const { Router } = require("@awaitjs/express");
const router = Router();

const { OmnisearchUserMangaResult } = require("../models");
const { OmnisearchUserMangaValidator } = require("../services/validation-service");
const MangaService = require("../services/manga-service");

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
 *                      $ref: '#/components/schemas/OmnisearchResult'
 *                  page:
 *                    type: integer
 *                  totalItem:
 *                    type: integer
 *                  totalPage:
 *                    type: integer
 */
router.getAsync("/user-manga", OmnisearchUserMangaValidator, async (req, res) => {
  let result = await MangaService.list({}, req.query.search, req.query.sort, req.query.page, req.query.perPage);
  result.data = result.data.map((manga) => new OmnisearchUserMangaResult(manga));
  res.json(result);
});

module.exports = router;
