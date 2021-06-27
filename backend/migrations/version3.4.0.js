#!/usr/bin/env node

/**
 Migrate from version 3.3.5 to version 3.4.0
 */

const mongoose = require("mongoose");

const { Manga } = require("../models");
const { DB_URL } = require("../config");
const MangaService = require("../services/manga-service");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

async function main() {
  console.log("Connecting to database");
  await mongoose.connect(DB_URL, { useUnifiedTopology: true });

  console.log("Fetch mangas");
  const nettruyenMangas = await Manga.find({ site: "NetTruyen" });
  console.log(`Found ${nettruyenMangas.length} mangas`);

  console.log("Replacing domain");
  for (const manga of nettruyenMangas) {
    manga.link = manga.link.replace("nettruyen.com", "nettruyentop.com");
    manga.chapters.forEach((chap) => (chap.link = chap.link.replace("nettruyen.com", "nettruyentop.com")));
  }

  console.log("Saving");
  await Promise.all(nettruyenMangas.map((manga) => manga.save()));

  console.log("Updating");
  await MangaService.updateMultiple(nettruyenMangas, true, true);

  console.log("Done");
  await mongoose.connection.close();
}

main().catch((err) => {
  console.error(err);
  mongoose.connection.close();
  process.exit(1);
});
