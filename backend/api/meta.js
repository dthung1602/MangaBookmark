const { Router } = require("@awaitjs/express");
const router = Router();

const { version } = require("../swaggerDef").info;
const { supportedSites, availableTags } = require("../services/manga-service/parsers");

//---------------------------------------
//  Get global meta data of this site
//---------------------------------------
/**
 * @swagger
 *
 * /api/meta:
 *   get:
 *     description: Get global meta data of this site
 *     responses:
 *       200:
 *         description: Retrieved successfully
 *         content:
 *           application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  supportedSites:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/MangaSite'
 *                  availableTags:
 *                    type: array
 *                    items:
 *                      type: string
 */
router.getAsync("/", async (req, res) => {
  res.json({ version, supportedSites, availableTags });
});

module.exports = router;
