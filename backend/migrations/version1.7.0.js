#!/usr/bin/env node

/**
 Migrate from version 1.6.2 to version 1.7.0
 */

const mongoose = require("mongoose");
const rq = require("request-promise");
const cheerio = require("cheerio");

const Manga = require("../models/Manga");
const { DB_URL } = require("../config");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

async function updateMangas(mangasToUpdate) {
  for (let manga of mangasToUpdate) {
    try {
      const $ = cheerio.load(
        await rq({
          uri: manga.link,
          insecure: true,
          rejectUnauthorized: false,
        }),
      );
      const newLink = $("script")[0].children[0].data.split('"')[1].trim();
      console.log(newLink);
      manga.link = newLink;
      await manga.save();
    } catch (e) {
      console.error("Cannot update manga " + manga.name);
      console.error(e);
      console.log("----------");
    }
  }
}

async function main() {
  console.log("Connecting to database");
  await mongoose.connect(DB_URL);

  console.log("Fetching mangas from mangakaklot.com to update");
  const mangasToUpdate = await Manga.find({
    link: { $regex: /^https?:\/\/mangakakalot\.com\/manga\/.+$/ },
  });

  await updateMangas(mangasToUpdate);
  console.log("Update manga done!");

  mongoose.connection.close();
}

main().catch((err) => {
  console.error(err);
  mongoose.connection.close();
  process.exit(1);
});
