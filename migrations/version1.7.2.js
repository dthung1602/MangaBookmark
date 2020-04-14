#!/usr/bin/env node

/**
 Migrate from version 1.7.2 to version 1.8.0
 */

const mongoose = require("mongoose");

const Manga = require("../models/Manga");
const { DB_URL } = require("../config");
const { parsers } = require("../crawl/parsers");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

function getSource(url) {
  for (let i = 0; i < parsers.length; i++) {
    if (url.match(parsers[i].URLRegex)) {
      return parsers[i].source;
    }
  }
  if (url.includes("mangarock")) {
    return "MangaRock";
  }
  return "Unknown";
}

async function updateMangas(mangasToUpdate) {
  for (let manga of mangasToUpdate) {
    try {
      manga.source = getSource(manga.link);
      console.log(`[${manga.source}] ${manga.name}`);
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

  console.log("Updating manga source");
  const mangasToUpdate = await Manga.find();

  await updateMangas(mangasToUpdate);
  console.log("Update manga done!");

  mongoose.connection.close();
}

main().catch((err) => {
  console.error(err);
  mongoose.connection.close();
  process.exit(1);
});
