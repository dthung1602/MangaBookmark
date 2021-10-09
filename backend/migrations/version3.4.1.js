#!/usr/bin/env node

/**
 Migrate from version 3.4.0 to version 3.4.1
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

  console.log("Fetch nettruyen mangas");
  const nettruyenMangas = await Manga.find({ site: "NetTruyen" });
  console.log(`Found ${nettruyenMangas.length} mangas`);

  console.log("Replacing domain");
  for (const manga of nettruyenMangas) {
    manga.link = manga.link.replace("nettruyentop.com", "nettruyenpro.com");
    manga.chapters.forEach((chap) => (chap.link = chap.link.replace("nettruyentop.com", "nettruyenpro.com")));
  }

  console.log("Saving");
  await Promise.all(nettruyenMangas.map((manga) => manga.save()));

  console.log("Updating");
  await MangaService.updateMultiple(nettruyenMangas, true, true);

  console.log("Fetch truyenqq mangas");
  const truyenqqMangas = await Manga.find({ site: "TruyenQQ" });
  console.log(`Found ${truyenqqMangas.length} mangas`);

  console.log("Replacing domain");
  for (const manga of truyenqqMangas) {
    manga.link = manga.link.replace("truyenqq.com", "truyenqqtop.com");
    manga.chapters.forEach((chap) => (chap.link = chap.link.replace("truyenqq.com", "truyenqqtop.com")));
  }

  console.log("Saving");
  await Promise.all(truyenqqMangas.map((manga) => manga.save()));

  console.log("Updating");
  await MangaService.updateMultiple(truyenqqMangas, true, true);

  console.log("Fetch hocvientruyentranh mangas");
  const hocvientruyentranhMangas = await Manga.find({ site: "HocVienTruyenTranh" });
  console.log(`Found ${hocvientruyentranhMangas.length} mangas`);

  console.log("Updating");
  await MangaService.updateMultiple(hocvientruyentranhMangas, true, true);

  console.log("Done");
  await mongoose.connection.close();
}

main().catch((err) => {
  console.error(err);
  mongoose.connection.close();
  process.exit(1);
});
