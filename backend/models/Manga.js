const mongoose = require("mongoose");
const FuzzySearching = require("mongoose-fuzzy-searching");
const { pick } = require("lodash");

const { AdvanceQuery } = require("./plugins");

/**
 * @swagger
 *
 * components:
 *    schemas:
 *      MangaShelf:
 *        type: string
 *        enum: [to read, reading, waiting, dropped, change site, reread, finished]
 */
const Shelf = Object.freeze({
  TO_READ: "to read",
  READING: "reading",
  WAITING: "waiting",
  DROPPED: "dropped",
  CHANGE_SITE: "change site",
  REREAD: "reread",
  FINISHED: "finished",
});

const Language = Object.freeze({
  EN: "en",
  VI: "vi",
});

function getMangaStatusCode(manga) {
  const allRead = manga.chapters.every((ch) => ch.isRead);

  if (manga.shelf === Shelf.REREAD) {
    return 2;
  }

  if (manga.isCompleted) {
    if (allRead) {
      return 0;
    } else {
      return 3;
    }
  } else {
    if (allRead) {
      return 1;
    } else {
      return 4;
    }
  }
}

/**
 * @swagger
 *
 * components:
 *    schemas:
 *      MangaStatusString:
 *        type: string
 *        enum: [finished, last chap reached, reread, many to read, new chap]
 */
function codeToStatus(code) {
  return ["finished", "last chap reached", "reread", "many to read", "new chap"][code];
}

/**
 * @swagger
 *
 * components:
 *    schemas:
 *      Chapter:
 *        type: object
 *        properties:
 *          id:
 *            $ref: '#/components/schemas/Id'
 *          name:
 *            type: string
 *          link:
 *            type: string
 *            format: uri
 *          isRead:
 *            type: boolean
 *          createdAt:
 *            type: string
 *            format: date-time
 *          updatedAt:
 *            type: string
 *            format: date-time
 */
const ChapterSchema = new mongoose.Schema(
  {
    name: String,
    link: String,
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

/**
 * @swagger
 *
 * components:
 *    schemas:
 *      NextRereadChapter:
 *        type: object
 *        properties:
 *          id:
 *            $ref: '#/components/schemas/Id'
 *          name:
 *            type: string
 *          link:
 *            type: string
 *            format: uri
 */
const NextRereadChapterSchema = new mongoose.Schema({
  name: String,
  link: String,
});

/**
 * @swagger
 *
 * components:
 *    schemas:
 *      Manga:
 *        type: object
 *        properties:
 *          id:
 *            $ref: '#/components/schemas/Id'
 *          user:
 *            $ref: '#/components/schemas/Id'
 *          name:
 *            type: string
 *          link:
 *            type: string
 *            format: uri
 *          site:
 *            type: string
 *          image:
 *            type: string
 *          description:
 *            type: string
 *          lang:
 *            type: string
 *            enum: [en, vi]
 *          alternativeNames:
 *            type: array
 *            items:
 *              type: string
 *          authors:
 *            type: array
 *            items:
 *              type: string
 *          tags:
 *            type: array
 *            items:
 *              type: string
 *          chapters:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Chapter'
 *          newChapCount:
 *            type: integer
 *          unreadChapCount:
 *            type: integer
 *          isCompleted:
 *            type: boolean
 *          status:
 *            type: integer
 *            minimum: 0
 *            maximum: 4
 *          statusString:
 *            $ref: '#/components/schemas/MangaStatusString'
 *          shelf:
 *            $ref: '#/components/schemas/MangaShelf'
 *          nextRereadChapter:
 *            $ref: '#/components/schemas/NextRereadChapter'
 *          note:
 *            type: string
 *          hidden:
 *            type: boolean
 *          lastReleased:
 *            type: string
 *            format: date-time
 *          createdAt:
 *            type: string
 *            format: date-time
 *          updatedAt:
 *            type: string
 *            format: date-time
 */
const MangaSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    name: String,
    link: String,
    site: String,
    image: String,

    description: {
      type: String,
      default: "",
    },
    lang: {
      type: String,
      enum: Object.values(Language),
      default: Language.EN,
    },
    alternativeNames: [String],
    authors: [String],
    tags: [String],

    chapters: [ChapterSchema],
    lastReleased: Date,
    newChapCount: Number,
    unreadChapCount: Number,
    isCompleted: {
      type: Boolean,
      default: false,
    },

    status: Number,
    shelf: {
      type: String,
      enum: Object.values(Shelf),
      default: Shelf.READING,
    },

    nextRereadChapter: NextRereadChapterSchema,

    note: {
      type: String,
      default: "",
    },
    hidden: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        ret.statusString = doc.statusString;
      },
    },
  },
);

MangaSchema.plugin(FuzzySearching, {
  fields: [
    {
      name: "name",
      minSize: 3,
      weight: 4,
    },
    {
      name: "alternativeNames",
      minSize: 3,
      weight: 2,
      prefixOnly: true,
    },
    {
      name: "authors",
      minSize: 3,
      weight: 2,
      prefixOnly: true,
    },
  ],
});

MangaSchema.plugin(AdvanceQuery, {
  rangeFields: [
    { field: "createdAt", isDate: true },
    { field: "lastReleased", isDate: true },
    { field: "unreadChapCount", isDate: false },
  ],
  matchAnyFields: ["shelf", "status", "site", "lang"],
  matchAllFields: ["tags"],
  objectIdFields: ["user"],
});

MangaSchema.index({ user: 1, shelf: 1, unreadChapCount: 1 });
MangaSchema.index({ user: 1, link: 1 }, { unique: true });
MangaSchema.index({ user: 1, tags: 1 });
MangaSchema.index(
  { user: 1, name_fuzzy: "text", alternativeNames_fuzzy: "text", authors_fuzzy: "text" },
  { unique: true },
);

MangaSchema.pre("save", function (next) {
  this.status = getMangaStatusCode(this);

  if (this.shelf === Shelf.REREAD) {
    if (!this.nextRereadChapter) {
      this.nextRereadChapter = pick(this.chapters[this.chapters.length - 1], ["name", "link"]);
    }
    let nextChapIdx = this.chapters.findIndex((ch) => ch.link === this.nextRereadChapter.link);

    if (nextChapIdx === -1) {
      nextChapIdx = this.chapters.findIndex((ch) => ch.name === this.nextRereadChapter.name);
    }

    nextChapIdx = Math.max(0, nextChapIdx);

    this.unreadChapCount = this.chapters.length - nextChapIdx;

    next();
    return;
  }

  this.nextRereadChapter = null;
  this.unreadChapCount = this.chapters.filter((ch) => !ch.isRead).length;
  next();
});

MangaSchema.virtual("statusString").get(function () {
  return codeToStatus(this.status);
});

Object.assign(MangaSchema.statics, {
  Shelf: Shelf,
  Language: Language,
});

let Manga = mongoose.model("Manga", MangaSchema);

module.exports = Manga;
