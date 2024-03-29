#!/usr/bin/env node

/**
 Migrate from version 4.4.1 to version 4.5.0
 */

import mongoose from "mongoose";

import { Manga } from "../models/index.js";
import { DB_URL } from "../config.js";

async function main() {
  console.log("Connecting to database");
  await mongoose.connect(DB_URL, { useUnifiedTopology: true });

  console.log("Updating Manganato");
  let cursor = await Manga.find({ site: "Manganato" });
  for await (const manga of cursor) {
    try {
      if (manga.link.includes("mangakakalot")) {
        manga.site = "Mangakakalot";
        console.log(`Converted to mangakakalot: ${manga.id} ${manga.link}`);
      } else {
        const oldLink = manga.link;
        manga.link = manga.link
          .replace("//manganato.com", "//chapmanganato.to")
          .replace("//readmanganato.com", "//chapmanganato.to")
          .replace("//chapmanganato.com", "//chapmanganato.to");
        console.log(`Replace host: ${oldLink} ===> ${manga.link}`);
      }
      await manga.save();
    } catch (e) {
      console.log(`Fail to update manga `, manga.id);
      console.error(e);
    }
  }

  console.log("Updating TruyenQQ");
  cursor = await Manga.find({ site: "TruyenQQ" });
  for await (const manga of cursor) {
    try {
      const oldLink = manga.link;
      manga.link = manga.link.replace("truyenqqpro.com", "truyenqqvn.com").replace("https://", "http://");
      await manga.save();
      console.log(`Convert link: ${oldLink} ===> ${manga.link}`);
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
