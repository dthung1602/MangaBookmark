import { Router } from "@awaitjs/express";
import multer from "multer";

import { ImageProxyValidator } from "../services/validation-service/index.js";
import { ImageProxyErrorHandlerMiddleware } from "../errors.js";
import { proxy, uploadAvatar } from "../services/image-service/index.js";
import { ensureTmpDirExist, getTmpFileName } from "../services/utils/index.js";

const router = Router();

//----------------------------------------
//  Image proxy with spoofed referer
//----------------------------------------
/**
 * @swagger
 *
 * /api/image/proxy:
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
router.getAsync("/proxy", ImageProxyValidator, async (req, res) => {
  const requestEtag = req.headers["if-none-match"];
  const etag = proxy.getEtag(req.query.url);

  // etag exists, image in cache
  if (etag && etag === requestEtag) {
    res.sendStatus(304);
    return;
  }

  const image = await proxy.getImage(req.query.url, req.query.mangaSite);

  // etag exists, image NOT in cache
  if (requestEtag === image.etag) {
    res.sendStatus(304);
    return;
  }

  // etag doesn't exists / doesn't match
  res.set("ETag", image.etag);
  res.set("Content-Type", image.contentType);
  res.end(image.buffer);
});

router.use("/proxy", ImageProxyErrorHandlerMiddleware);

//-----------------------------------
//  Upload avatar
//-----------------------------------
/**
 * @swagger
 *
 * /api/image/avatar:
 *   post:
 *     description: Upload user avatar
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               filename:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 *         content:
 *           application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                    enum: [success, fail]
 *                  url:
 *                    type: string
 *                    format: url
 *                  error:
 *                    type: string
 */

const uploadStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const path = "upload/avatar";
    ensureTmpDirExist(path)
      .then(() => cb(null, getTmpFileName(path)))
      .catch((e) => cb(e, null));
  },
  filename: function (req, file, cb) {
    const extension = file.originalname.split(".").pop();
    const filename = Date.now() + "-" + Math.round(Math.random() * 1e9) + "." + extension;
    cb(null, filename);
  },
});

const upload = multer({ storage: uploadStorage });

router.post("/avatar", upload.single("file"), (req, res, next) => {
  uploadAvatar(req.user.id, req.file.path)
    .then((result) => {
      res.json(result);
    })
    .catch((e) => {
      next(e);
    });
});

export default router;
