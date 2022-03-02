#!/usr/bin/env node

/**
 Migrate from version 3.3.5 to version 3.4.0
 */

const mongoose = require("mongoose");
const { chunk } = require("lodash");

const { Manga } = require("../models");
const { DB_URL, CRAWL_CONCURRENCY } = require("../config");
const { fetch } = require("../services/scraping-service");
const MangaService = require("../services/manga-service");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

async function updateRedirectURL(obj) {
  obj.link = (await fetch(obj.link)).url;
}

async function main() {
  console.log("Connecting to database");
  await mongoose.connect(DB_URL, { useUnifiedTopology: true });

  console.log("Fetch nettruyen mangas");
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

  console.log("Fetch mangadex mangas");
  const mangadexMangas = await Manga.find({ site: "MangaDex" });
  console.log(`Found ${mangadexMangas.length} mangas`);

  const chunks = chunk(mangadexMangas, CRAWL_CONCURRENCY);

  for (let i = 0; i < chunks.length; i++) {
    await Promise.all(
      chunks[i].map(async (manga) => {
        console.log(`    Update url of ${manga.name}`);
        await updateRedirectURL(manga);
        const chapterChunks = chunk(manga.chapters, CRAWL_CONCURRENCY);
        for (let j = 0; j < chapterChunks.length; j++) {
          console.log(`       [${j}] Update chapters of ${manga.name}`);
          await Promise.all(chapterChunks[j].map(updateRedirectURL));
        }
      }),
    );
  }

  console.log("Updating");
  await MangaService.updateMultiple(mangadexMangas, true, true);

  console.log("Done");
  await mongoose.connection.close();
}

main().catch((err) => {
  console.error(err);
  mongoose.connection.close();
  process.exit(1);
});
