#!/usr/bin/env node

const mongoose = require("mongoose");
const webpush = require("web-push");
const { updateMangas } = require("../crawl/runner");
const { Manga, Subscription } = require("../models");
const { DB_URL, REACT_APP_VAPID_PUBLIC_KEY, REACT_APP_VAPID_PRIVATE_KEY, WEB_PUSH_CONTACT } = require("../config");

webpush.setVapidDetails(WEB_PUSH_CONTACT, REACT_APP_VAPID_PUBLIC_KEY, REACT_APP_VAPID_PRIVATE_KEY);

async function sendPushMessages(mangas) {
  console.log("Start sending notifications");

  const userToMangasMapping = {};
  for (let i = 0; i < mangas.length; i++) {
    const manga = mangas[i];
    if (manga.newChapCount === 0) {
      continue;
    }

    if (!userToMangasMapping[manga.user]) {
      userToMangasMapping[manga.user] = [];
    }
    userToMangasMapping[manga.user].push(manga);
  }

  const promises = [];
  for (let userId in userToMangasMapping) {
    if (!userToMangasMapping.hasOwnProperty(userId)) {
      continue;
    }

    const mangas = userToMangasMapping[userId].map((manga) => ({
      name: manga.name,
      newChapCount: manga.newChapCount,
      unreadChapCount: manga.unreadChapCount,
    }));
    if (mangas.length === 0) {
      continue;
    }
    const data = JSON.stringify(mangas);
    const subscriptions = await Subscription.find({ user: userId });

    let successCount = 0;
    let promise = Promise.all(
      subscriptions.map((subscription) =>
        webpush
          .sendNotification(subscription.toStdFormat(), data)
          .then(() => {
            successCount += 1;
          })
          .catch((err) => {
            if (err.statusCode === 404 || err.statusCode === 410) {
              console.log(`Subscription ${subscription._id} has expired or is no longer valid`);
              subscription.delete();
            } else {
              console.error(err);
            }
          }),
      ),
    ).then(() => {
      console.log(`   Sent ${successCount}/${subscriptions.length} notifications to user "${userId}"`);
    });
    promises.push(promise);
  }

  await Promise.all(promises);
  console.log("Done sending notifications");
}

async function main() {
  console.log("Connecting to database");
  await mongoose.connect(DB_URL);

  console.log("Fetching mangas to update");
  const mangasToUpdate = await Manga.find({
    following: { $in: ["toread", "following", "waiting"] },
    isCompleted: false,
  });

  const successMangas = await updateMangas(mangasToUpdate, true);
  console.log("Update manga done!");

  await sendPushMessages(successMangas);
  mongoose.connection.close();
}

main().catch((err) => {
  console.error(err);
  mongoose.connection.close();
  process.exit(1);
});
