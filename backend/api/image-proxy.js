const { Router } = require("@awaitjs/express");

const router = Router();

const { ImageProxyValidator } = require("../services/validation-service");
const { getImage, getEtag } = require("../services/image-proxy-service");

//----------------------------------------
//  Image proxy with spoofed referer
//----------------------------------------
/**
 * @swagger
 *
 * /api/image-proxy:
 *   get:
 *     description: Get image with spoofed referer to bypass security measures
 *     responses:
 *       200:
 *         description: Retrieved successfully
 *         content:
 *           image/jpeg
 *           image/png
 *           image/webp
 *           image/gif
 */
router.getAsync("/", ImageProxyValidator, async (req, res) => {
  const requestEtag = req.headers["if-none-match"];
  const formattedEtag = `"${getEtag(req.url)}"`;

  if (requestEtag === formattedEtag) {
    res.sendStatus(304);
  } else {
    const image = await getImage(req.query.url, req.query.mangaSite);
    res.set("ETag", formattedEtag);
    res.set("Content-Type", image.contentType);
    res.end(image.buffer);
  }
});

module.exports = router;
