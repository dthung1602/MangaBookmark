import lodash from "lodash";

const { pick } = lodash;
const summaryFields = ["_id", "name", "site", "link", "newChapCount"];

const Statuses = Object.freeze({
  SUCCESS: "success",
  FAILED: "failed",
});

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
 *            enum: [success, failed]
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
  static Statuses = Statuses;

  constructor(status, data = {}, error = undefined) {
    this.status = status;
    this.data = pick(data, summaryFields);
    this.error = error;
  }
}

export default MangaUpdateSummary;
