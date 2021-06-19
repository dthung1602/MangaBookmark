const { Router } = require("@awaitjs/express");

const router = Router();

const { ImageProxyValidator } = require("../services/validation-service");
const { ImageProxyErrorHandlerMiddleware } = require("../errors");
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
 *     parameters:
 *       - in: query
 *         name: url
 *         description: image url
 *         schema:
 *           type: string
 *           format: uri
 *           required: true
 *       - in: query
 *         name: mangaSite
 *         description: the manga site that host the image
 *         schema:
 *           type: string
 *           required: false
 *     responses:
 *       200:
 *         description: Retrieved successfully
 *         content:
 *           image/jpeg:
 *             schema:
 *               type: string
 *               format: binary
 *           image/png:
 *             schema:
 *               type: string
 *               format: binary
 *           image/webp:
 *             schema:
 *               type: string
 *               format: binary
 *           image/gif:
 *             schema:
 *               type: string
 *               format: binary
 */
router.getAsync("/", ImageProxyValidator, async (req, res) => {
  const requestEtag = req.headers["if-none-match"];
  const etag = getEtag(req.query.url);

  if (etag && etag === requestEtag) {
    res.sendStatus(304);
    return;
  }

  const image = await getImage(req.query.url, req.query.mangaSite);
  if (requestEtag === image.etag) {
    res.sendStatus(304);
    return;
  }

  res.set("ETag", etag);
  res.set("Content-Type", image.contentType);
  res.end(image.buffer);
});

router.use("/", ImageProxyErrorHandlerMiddleware);

module.exports = router;
