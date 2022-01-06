const crypto = require("crypto");

const { pick, cloneDeep } = require("lodash");

const resultFields = ["_id", "name", "image"];

/**
 * @swagger
 *
 * components:
 *    schemas:
 *      OmnisearchResult:
 *        type: object
 *        properties:
 *          _id:
 *            $ref: '#/components/schemas/Id'
 *          type:
 *            type: string
 *            enum: [user-manga, scanlation-manga]
 *          name:
 *            type: string
 *          image:
 *            type: string
 *            format: uri
 *          attributes:
 *            type: object
 */
class OmnisearchResult {
  constructor(manga, type) {
    Object.assign(this, cloneDeep(pick(manga, resultFields)));
    this.normalizeId();
    this.type = type;
    this.attributes = {};
  }

  normalizeId() {
    this._id = this._id.toString();
    if (!this._id.match(/^[0-9a-f]{24}$/)) {
      const hash = crypto.createHash("md5").update(this._id).digest("hex");
      this._id = hash.slice(0, 24);
    }
  }
}

const userMangaAttributes = ["status", "shelf", "site", "isCompleted", "authors", "lastReleased"];

class OmnisearchUserMangaResult extends OmnisearchResult {
  constructor(manga) {
    super(manga, "user-manga");
    this.attributes = cloneDeep(pick(manga, userMangaAttributes));
    this.attributes.latestChapter = pick(manga.chapters[0] || {}, ["name", "link"]);
  }
}

const scanlationMangaAttributes = ["site", "isCompleted", "authors", "lastReleased", "latestChapter", "totalChapters"];

class OmnisearchScanlationMangaResult extends OmnisearchResult {
  constructor(manga) {
    super(manga, "scanlation-manga");
    this.attributes = cloneDeep(pick(manga, scanlationMangaAttributes));
  }
}

module.exports = {
  OmnisearchUserMangaResult,
  OmnisearchScanlationMangaResult,
};
