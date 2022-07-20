#!/usr/bin/env node

/**
 Migrate from version 4.0.0 to version 4.1.0
 */

const mongoose = require("mongoose");

const { Manga } = require("../models");
const { DB_URL } = require("../config");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

async function main() {
  console.log("Connecting to database");
  await mongoose.connect(DB_URL, { useUnifiedTopology: true });

  console.log("Fetch all mangas");
  const cursor = await Manga.find({ site: "TruyenQQ" });

  console.log("Updating TruyenQQ");
  for await (const manga of cursor) {
    try {
      manga.link = manga.link.replace("truyenqqvip", "truyenqqpro").replace("truyenqqtop", "truyenqqpro");
      await manga.save();
    } catch (e) {
      console.log(`Fail to update manga `, manga.id);
      console.error(e);
    }
  }

  console.log("Done");
  await mongoose.connection.close();
}

main().catch((err) => {
  console.error(err);
  mongoose.connection.close();
  process.exit(1);
});
