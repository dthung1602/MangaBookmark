const { pick } = require("lodash");

const summaryFields = ["_id", "name", "site", "link", "newChapCount"];

/**
 * @swagger
 *
 * components:
 *    schemas:
 *      MangaUpdateSummary:
 *        type: object
 *        properties:
 *          status:
 *            type: string
 *            enum: [success, processing, failed]
 *          error:
 *            type: string
 *            required: false
 *          data:
 *            type: object
 *            required: false
 *            properties:
 *              _id:
 *                $ref: '#/components/schemas/Id'
 *              name:
 *                type: string
 *              site:
 *                type: string
 *              link:
 *                type: string
 *                format: uri
 *              newChapCount:
 *                type: integer
 */
class MangaUpdateSummary {
  constructor(status, data = {}, error = undefined) {
    this.status = status;
    this.data = pick(data, summaryFields);
    this.error = error;
  }
}

module.exports = MangaUpdateSummary;
