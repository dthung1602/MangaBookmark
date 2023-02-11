import lodash from "lodash";

import { trimExtra, normalizeURL, normalizeDate, parseBoolean } from "../services/utils/index.js";

const { pick, cloneDeep, get, set } = lodash;
const resultFields = ["name", "image"];

/**
 * @swagger
 *
 * components:
 *    schemas:
 *      OmnisearchResult:
 *        type: object
 *        properties:
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
  static stringAttributes = [];
  static linkAttributes = [];
  static dateAttributes = [];
  static intAttributes = [];
  static booleanAttributes = [];

  static normalizerMapping = {
    stringAttributes: trimExtra,
    linkAttributes: normalizeURL,
    dateAttributes: normalizeDate,
    intAttributes: parseInt,
    booleanAttributes: parseBoolean,
  };

  constructor(manga, type) {
    Object.assign(this, cloneDeep(pick(manga, resultFields)));
    this.type = type;
    this.attributes = {};
  }

  normalize() {
    const attr = this.attributes;
    this.name = trimExtra(this.name);
    this.image = normalizeURL(this.image);

    for (let [group, normalizer] of Object.entries(this.constructor.normalizerMapping)) {
      const fields = this.constructor[group];
      for (let field of fields) {
        const currentValue = get(attr, field);
        if (currentValue !== undefined) {
          set(attr, field, normalizer(currentValue));
        }
      }
    }
  }
}

const userMangaAttributes = ["_id", "status", "shelf", "site", "isCompleted", "authors", "lastReleased"];

class OmnisearchUserMangaResult extends OmnisearchResult {
  static stringAttributes = ["shelf", "site"];
  static dateAttributes = ["lastReleased"];
  static booleanAttributes = ["isCompleted"];
  static intAttributes = ["status"];

  constructor(manga) {
    super(manga, "user-manga");
    this.attributes = cloneDeep(pick(manga, userMangaAttributes));
    this.attributes.latestChapter = pick(manga.chapters[0] || {}, ["name", "link"]);
    this.normalize();
  }
}

const scanlationMangaAttributes = [
  "site",
  "link",
  "isCompleted",
  "authors",
  "lastReleased",
  "latestChapter",
  "totalChapters",
];

class OmnisearchScanlationMangaResult extends OmnisearchResult {
  static stringAttributes = ["site", "latestChapter.name"];
  static linkAttributes = ["link", "latestChapter.link"];
  static booleanAttributes = ["isCompleted"];
  static dateAttributes = ["lastReleased"];
  static intAttributes = ["totalChapters"];

  constructor(manga) {
    super(manga, "scanlation-manga");
    this.attributes = cloneDeep(pick(manga, scanlationMangaAttributes));
    this.normalize();
  }
}

export { OmnisearchUserMangaResult, OmnisearchScanlationMangaResult };
export default {
  OmnisearchUserMangaResult,
  OmnisearchScanlationMangaResult,
};
