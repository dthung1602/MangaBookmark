#!/usr/bin/env node

/**
 Migrate from version 1.7.2 to version 2.0.0
 */

const mongoose = require("mongoose");

const db = require("../services/db-service");

//----------------------------------
//     Old schema defined here
//----------------------------------

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

const chapterSchema = new mongoose.Schema(
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

const mangaSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    name: String,
    link: String,
    source: String,
    image: String,

    chapters: [chapterSchema],
    isCompleted: {
      type: Boolean,
      default: false,
    },

    statusCode: Number,
    following: {
      type: String,
      enum: ["toread", "following", "waiting", "dropped", "finished"],
      default: "following",
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
        delete ret.statusCode;
        ret.status = doc.status;
      },
    },
  },
);

mangaSchema.index({ name: "text" });
mangaSchema.index({ user: 1, following: 1, hidden: 1 });
mangaSchema.index({ user: 1, link: 1 }, { unique: true });

mangaSchema.pre("save", function (next) {
  this.statusCode = getMangaStatusCode(this);
  next();
});

mangaSchema.virtual("status").get(function () {
  return codeToStatus(this.statusCode);
});

//------------------------------------

async function main() {
  console.log("Connecting to database");
  await db.ensureDBConnection();

  console.log("Start updating");

  console.log("Rename status");
  const OldManga = mongoose.model("Manga", mangaSchema);
  await OldManga.updateMany({}, { $rename: { statusCode: "status" } }, { multi: true });

  delete mongoose.connection.models["Manga"];
  const Manga = require("../models/Manga");

  console.log("Add new chap count & unread chap count");
  let mangas = await Manga.find({});
  let saved = [];
  for (let manga of mangas) {
    manga.newChapCount = 0;
    saved.push(manga.save());
  }

  console.log("Saving");
  await Promise.all(saved);

  console.log("Done!");
  await db.closeDBConnection();
}

main().catch((err) => {
  console.error(err);
  db.closeDBConnection();
  process.exit(1);
});
