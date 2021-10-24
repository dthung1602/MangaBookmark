const updateSingleManga = require("./update");
const { Manga, MangaUpdateSummary } = require("../../models");
const { getMangaUpdateQueue, getMangaUpdateResultCache, getMangaUpdateStatusMemo } = require("../../datasource");
const { CRAWL_CONCURRENCY } = require("../../config");

const ProcessStatuses = Object.freeze({
  NONE: "none",
  PROCESSING: "processing",
  DONE: "done",
  ERROR: "error",
});

const QueueTypes = Object.freeze({
  ADHOC: "adhoc",
  SCHEDULED: "scheduled",
});

function checkQueueType(type) {
  if (type !== QueueTypes.SCHEDULED && type !== QueueTypes.ADHOC) {
    throw new Error(`Invalid queue type ${type}`);
  }
}

async function pushToQueue(queueType, filters, verbose) {
  checkQueueType(queueType);

  const queue = getMangaUpdateQueue(queueType);
  const mangasToUpdate = Manga.find(filters);

  const queueResponse = [];
  let pushedToQueue = 0;
  for await (const manga of mangasToUpdate) {
    console.log(`Found manga "${manga.name}" - ${manga.site}`);
    queueResponse.push(queue.enqueue(manga).then(() => (pushedToQueue += 1)));
  }
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

async function consumeFromQueue(queueType, additionalUpdate, verbose) {
  checkQueueType(queueType);

  const queue = getMangaUpdateQueue(queueType);
  const resultCache = getMangaUpdateResultCache(queueType);

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const promises = [];
    for (let i = 0; i < CRAWL_CONCURRENCY; i++) {
      const manga = await queue.retrieve(decodeManga);
      if (!manga) {
        return Promise.allSettled(promises);
      }
      if (verbose) {
        console.log(`Updating "${manga.name}" - ${manga.site}`);
      }
      promises.push(
        updateSingleManga(manga, additionalUpdate)
          .then(() => {
            console.log(`Update successfully manga "${manga.name}" - ${manga.site}`);
            return resultCache.addOne(manga.user, new MangaUpdateSummary("success", manga));
          })
          .catch((e) => {
            if (verbose) {
              console.error(`Fail to update ${manga.name} - ${manga.site}`);
              console.error(e);
            }
            return resultCache.addOne(manga.user, new MangaUpdateSummary("failed", undefined, e.toString()));
          }),
      );
    }
    await Promise.allSettled(promises);
  }
}

async function setUpdateStatus(user, status, expireInSeconds = 20 * 60) {
  if (!Object.values(ProcessStatuses).includes(status)) {
    throw new Error(`Invalid status ${status}`);
  }
  const memo = getMangaUpdateStatusMemo();
  return await memo.set(user.id, status, expireInSeconds);
}

async function getUpdateStatus(user) {
  const memo = getMangaUpdateStatusMemo();
  return (await memo.get(user.id)) || ProcessStatuses.NONE;
}

async function popResult(user) {
  const resultCache = getMangaUpdateResultCache(QueueTypes.ADHOC);
  return await resultCache.retrieveAll(user.id);
}

module.exports = {
  pushToQueue,
  consumeFromQueue,
  setUpdateStatus,
  getUpdateStatus,
  popResult,
  ProcessStatuses,
  QueueTypes,
};
