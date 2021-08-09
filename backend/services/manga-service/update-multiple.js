const { pick } = require("lodash");

const updateSingleManga = require("./update");
const { Manga } = require("../../models");
const { Queue, ResultCache } = require("../../datasource");
const { CRAWL_CONCURRENCY } = require("../../config");

function getQueue() {
  return new Queue("manga-update");
}

function getResultCache() {
  return new ResultCache("manga-update");
}

async function pushToQueue(filters, verbose) {
  const queue = getQueue();
  const mangasToUpdate = Manga.find(filters);

  const queueResponse = [];
  let pushedToQueue = 0;
  console.log("Start");
  for await (const manga of mangasToUpdate) {
    console.log(`found manga "${manga.name}"`);
    queueResponse.push(queue.enqueue(manga).then(() => (pushedToQueue += 1)));
  }
  console.log("Waiting...");
  await Promise.allSettled(queueResponse);

  if (verbose) {
    console.log(`Found ${queueResponse.length} mangas`);
    console.log(`Pushed to queue ${pushedToQueue} mangas`);
  }

  return pushedToQueue;
}

function decodeManga(raw) {
  const manga = new Manga(JSON.parse(raw));
  manga.isNew = false;
  return manga;
}

async function consumeFromQueue(additionalUpdate, verbose) {
  const queue = getQueue();
  const resultCache = getResultCache();
  const reportFields = ["name", "_id", "site", "link", "newChapCount"];

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const promises = [];
    for (let i = 0; i < CRAWL_CONCURRENCY; i++) {
      const manga = await queue.retrieve(decodeManga);
      if (!manga) {
        console.log("all mangas fetched");
        await Promise.allSettled(promises);
        return;
      }
      if (verbose) {
        console.log(`Updating ${manga.name} - ${manga.site}`);
      }
      promises.push(
        updateSingleManga(manga, additionalUpdate)
          .then(() => {
            console.log(`Update successfully manga ${manga.name}`);
            return resultCache.addOne(manga.user, { status: "success", data: pick(manga, reportFields) });
          })
          .catch((e) => {
            if (verbose) {
              console.error(`Fail to update ${manga.name} - ${manga.site}`);
              console.error(e);
            }
            return resultCache.addOne(manga.user, { status: "failed", error: e.toString() });
          }),
      );
    }
    console.log("waiting for manga batch");
    await Promise.allSettled(promises);
    console.log("manga batch finished");
  }
}

module.exports = {
  pushToQueue,
  consumeFromQueue,
};
