#!/usr/bin/env node

/**
 Migrate from version 3.1.1 to version 3.2.0
 */

const mongoose = require("mongoose");

const { Manga } = require("../models");
const { DB_URL } = require("../config");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

async function main() {
  console.log("Connecting to database");
  await mongoose.connect(DB_URL);

  for await (const manga of Manga.find()) {
    manga.save();
  }

  await mongoose.connection.close();
}

main().catch((err) => {
  console.error(err);
  mongoose.connection.close();
  process.exit(1);
});
