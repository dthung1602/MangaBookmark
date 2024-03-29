#!/usr/bin/env node

import readline from "readline";

import { Manga } from "../models";
import db from "../services/db-service";
import MangaService from "../services/manga-service";

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

function readLine(questionText) {
  return new Promise((resolve) => {
    rl.question(questionText, (input) => resolve(input.trim()));
  });
}

async function main() {
  const action = process.argv[2] || (await readLine("Action: "));
  const url = process.argv[3] || (await readLine("URL: "));
  if (action !== "create" && action !== "update") {
    throw "Invalid action";
  }
  await db.ensureDBConnection();
  if (action === "create") {
    await MangaService.create({ link: url });
  } else {
    let manga = await Manga.findOne({ link: url });
    await MangaService.update(manga);
    await manga.save();
  }
  db.closeDBConnection();
  rl.close();
}

main().catch((err) => {
  console.error(err);
  db.closeDBConnection();
  rl.close();
  process.exit(1);
});
