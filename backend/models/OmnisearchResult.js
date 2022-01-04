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
    this.type = type;
    this.attributes = {};
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

const scanlationMangaAttributes = ["site", "isCompleted", "authors", "lastReleased"];

class OmnisearchScanlationMangaResult extends OmnisearchResult {
  constructor(manga) {
    super(manga, "scanlation-manga");
    this.attributes = cloneDeep(pick(manga, scanlationMangaAttributes));
    this.attributes.totalChapters = manga.chapters.length;
    this.attributes.latestChapter = pick(manga.chapters[0] || {}, ["name", "link"]);
  }
}

module.exports = {
  OmnisearchUserMangaResult,
  OmnisearchScanlationMangaResult,
};
