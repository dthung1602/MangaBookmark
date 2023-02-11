#!/usr/bin/env node

import { Manga } from "../models/index.js";
import db from "../services/db-service.js";
import datasource from "../datasource/index.js";
import { pushAllMangaNotifications } from "../services/push-service.js";
import { updateMultiple } from "../services/manga-service/index.js";
const { TO_READ, READING, WAITING, REREAD } = Manga.Shelf;
const {
  updateMultiple: { pushToQueue, consumeFromQueue, QueueTypes },
} = { updateMultiple };

async function main() {
  console.log("Connecting to database");
  await db.ensureDBConnection();

  // TODO add more shelf
  const filters = {
    shelf: { $in: [TO_READ, READING, WAITING, REREAD] },
    isCompleted: false,
  };
  await pushToQueue(QueueTypes.SCHEDULED, filters, true);
  await consumeFromQueue(QueueTypes.SCHEDULED, true, true);
  await pushAllMangaNotifications(true);

  await datasource.closeAllConnections();
  await db.closeDBConnection();
}

main().catch((err) => {
  console.error(err);
  datasource.closeAllConnections();
  db.closeDBConnection();
  process.exit(1);
});
