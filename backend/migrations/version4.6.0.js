#!/usr/bin/env node

/**
 Migrate from version 4.5.0 to version 4.6.0
 */

import mongoose from "mongoose";
import slugify from "slugify";

import { Manga } from "../models/index.js";
import { DB_URL } from "../config.js";

function kebabCase(text) {
  return slugify(text, { lower: true, trim: true })
    .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric with hyphens
    .replace(/^-+|-+$/g, "") // Remove leading/trailing hyphens
    .replace(/-+/g, "-"); // Replace multiple hyphens with single hyphen
}

async function main() {
  console.log("Connecting to database");
  await mongoose.connect(DB_URL, { useUnifiedTopology: true });

  console.log("Updating Manganato to Natomanga");
  let cursor = await Manga.find({ site: "Manganato" });
  for await (const manga of cursor) {
    try {
      const oldLink = manga.link;
      let additionalNote = "[URL] " + oldLink + "\n";

      let lastReadChapter = manga.chapters.find(ch => ch.isRead);
      if (lastReadChapter) {
        additionalNote += "[LastChapter] " + lastReadChapter.name + " " + lastReadChapter.link + "\n";
      }

      manga.description = additionalNote + manga.description;
      manga.link = "https://www.natomanga.com/manga/" + kebabCase(manga.name);
      console.log(`Replace host: ${oldLink} ===> ${manga.link}`);
      console.log(`Last read chapter: ${lastReadChapter?.name}`);
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
