const mongoose = require("mongoose");

const FollowingStatuses = Object.freeze({
  TO_READ: "toread",
  FOLLOWING: "following",
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
  return ["Finished", "Last chap reached", "Many to read", "New chap"][code];
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
 *            type: uuid
 *          name:
 *            type: string
 *          link:
 *            type: string
 *            format: uri
 *          isRead:
 *            type: bool
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
 *            type: uuid
 *          user:
 *            type: uuid
 *          name:
 *            type: string
 *          link:
 *            type: string
 *            format: uri
 *          source:
 *            type: string
 *          image:
 *            type: string
 *          chapters:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Chapter'
 *          newChapCount:
 *            type: int
 *          unreadChapCount:
 *            type: int
 *          isCompleted:
 *            type: boolean
 *          status:
 *            type: int
 *            minimum: 0
 *            maximum: 3
 *          statusString:
 *            type: string
 *            enum: [Finished, Last chap reached, Many to read, New chap]
 *          following:
 *            type: string
 *            enum: [toread, following, waiting, dropped, finished]
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
    source: String,
    image: String,

    chapters: [ChapterSchema],
    newChapCount: Number,
    unreadChapCount: Number,
    isCompleted: {
      type: Boolean,
      default: false,
    },

    status: Number,
    following: {
      type: String,
      enum: Object.values(FollowingStatuses),
      default: FollowingStatuses.FOLLOWING,
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
MangaSchema.index({ user: 1, following: 1, status: 1, hidden: 1 });
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
  FollowingStatuses,
});

let Manga = mongoose.model("Manga", MangaSchema);

module.exports = Manga;
