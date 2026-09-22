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

  console.log("Fixing host name of WeebCentral");
  let cursor = await Manga.find({ site: "WeebCentral" });
  for await (const manga of cursor) {
    try {
      manga.chapters.forEach((chapter) => {
        if (chapter.link.startsWith("http")) {
          const url = new URL(chapter.link);
          url.hostname = "weebcentral.com";
          chapter.link = url.toString();
        } else {
          chapter.link = "https://weebcentral.com" + chapter.link;
        }
      });

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
