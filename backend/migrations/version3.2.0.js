#!/usr/bin/env node

/**
 Migrate from version 3.1.1 to version 3.2.0
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
  await mongoose.connect(DB_URL);

  const allMangas = await Manga.find();
  await MangaService.updateMultiple(allMangas, true, true);

  await mongoose.connection.close();
}

main().catch((err) => {
  console.error(err);
  mongoose.connection.close();
  process.exit(1);
});
