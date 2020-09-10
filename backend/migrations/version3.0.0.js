#!/usr/bin/env node

/**
 Migrate from version 2.x to version 3.0.0

 Unlike other migrations, this migration does NOT include downloading & uploading data
 It only convert downloaded .json files and the database owner has to upload data manually

 Usage:
    $ node version3.0.0.js <path to directory contains db dump files>
 */

const fs = require("fs").promises;
// const util = require("util");

// const readFile = util.promisify(fs.readFile);
// const writeFile = util.promisify(fs.writeFile);
const directory = process.argv[2];
const now = new Date().toISOString();

async function main() {
  if (process.argv.length < 3) {
    throw "Missing dump directory";
  }

  await updateUser();
  await updateSub();
  await updateManga();
}

async function updateUser() {
  const bytes = await fs.readFile(directory + "/users.json");
  const users = JSON.parse(String(bytes));

  for (let user of users) {
    delete user.primaryAccount;
    user.createdAt = user.updatedAt = { $date: now };
  }
  await fs.writeFile(directory + "/new_users.json", JSON.stringify(users));
}

async function updateSub() {
  const bytes = await fs.readFile(directory + "/subscriptions.json");
  const subscriptions = JSON.parse(String(bytes));

  for (let subscription of subscriptions) {
    subscription.createdAt = subscription.updatedAt = { $date: now };
  }

  await fs.writeFile(directory + "/new_subscriptions.json", JSON.stringify(subscriptions));
}

async function updateManga() {
  const bytes = await fs.readFile(directory + "/mangas.json");
  const mangas = JSON.parse(String(bytes));

  for (let manga of mangas) {
    manga.shelf = manga.following;
    delete manga.following;
    if (manga.shelf === "toread") {
      manga.shelf = "to read";
    } else if (manga.shelf === "following") {
      manga.shelf = "reading";
    }

    manga.site = manga.source;
    delete manga.source;

    manga.status = manga.statusCode;
    delete manga.statusCode;

    manga.newChapCount = 0;
    manga.unreadChapCount = manga.chapters.filter((ch) => !ch.isRead).length;
    manga.lastReleased = manga.chapters
      .map((ch) => ch.createdAt)
      .sort()
      .pop();
  }
  await fs.writeFile(directory + "/new_mangas.json", JSON.stringify(mangas));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
