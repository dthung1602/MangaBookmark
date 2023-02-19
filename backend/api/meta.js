import { Router } from "@awaitjs/express";

import { info } from "../swagger-def.cjs";
import { supportedSites, availableTags } from "../services/manga-service/parsers/index.js";
import { supportedSites as supportedSearchSites } from "../services/scanlation-site-searching-service/index.js";

const router = Router();
const { version } = info;

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
 *                  version:
 *                    type: string
 *                  supportedSites:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/MangaSite'
 *                  supportedSearchSites:
 *                    type: array
 *                    items:
 *                      type: string
 *                  availableTags:
 *                    type: array
 *                    items:
 *                      type: string
 */
router.getAsync("/", async (req, res) => {
  res.json({ version, supportedSites, supportedSearchSites, availableTags });
});

export default router;
