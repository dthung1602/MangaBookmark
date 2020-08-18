const mongoose = require("mongoose");

const Shelf = Object.freeze({
  TO_READ: "to read",
  READING: "reading",
  WAITING: "waiting",
  DROPPED: "dropped",
  FINISHED: "finished",
});

function getMangaStatusCode(manga) {
  const allRead = manga.chapters.every((ch) => ch.isRead);

  if (manga.isCompleted) {
    if (allRead) {
      return 0;
    } else {
      return 2;
    }
  } else {
    if (allRead) {
      return 1;
    } else {
      return 3;
    }
  }
}

function codeToStatus(code) {
  return ["finished", "last chap reached", "many to read", "new chap"][code];
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
 *            maximum: 3
 *          statusString:
 *            type: string
 *            enum: [finished, last chap reached, many to read, new chap]
 *          shelf:
 *            type: string
 *            enum: [to read, reading, waiting, dropped, finished]
 *          note:
 *            type: string
 *          hidden:
 *            type: boolean
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

    chapters: [ChapterSchema],
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

MangaSchema.index({ name: "text" });
MangaSchema.index({ user: 1, shelf: 1, status: 1, hidden: 1 });
MangaSchema.index({ user: 1, link: 1 }, { unique: true });

MangaSchema.pre("save", function (next) {
  this.status = getMangaStatusCode(this);
  this.unreadChapCount = this.chapters.filter((ch) => !ch.isRead).length;
  next();
});

MangaSchema.virtual("statusString").get(function () {
  return codeToStatus(this.status);
});

Object.assign(MangaSchema.statics, {
  Shelf: Shelf,
});

let Manga = mongoose.model("Manga", MangaSchema);

module.exports = Manga;
