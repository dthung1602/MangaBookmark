const updateSingleManga = require("./update");
const {
  getLogger,
  TOTAL_MANGA_FOUND,
  TOTAL_MANGA_PUSHED_TO_QUEUE,
  UPDATE_MANGA_SUCCEEDED,
  UPDATE_MANGA_FAILED,
} = require("../log-service");
const { Manga, MangaUpdateSummary } = require("../../models");
const { getMangaUpdateQueue, getMangaUpdateResultCache, getMangaUpdateStatusMemo } = require("../../datasource");
const { CRAWL_CONCURRENCY } = require("../../config");

const logger = getLogger("update-multiple-service");

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
    queueResponse.push(queue.enqueue(manga).then(() => (pushedToQueue += 1)));
  }
  await Promise.allSettled(queueResponse);

  if (verbose) {
    logger.log(TOTAL_MANGA_FOUND, { total: queueResponse.length });
    logger.log(TOTAL_MANGA_PUSHED_TO_QUEUE, { total: pushedToQueue });
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
      promises.push(
        updateSingleManga(manga, additionalUpdate)
          .then(() => {
            logger.log(UPDATE_MANGA_SUCCEEDED, {
              id: manga.id,
              site: manga.site,
              link: manga.link,
              name: manga.name,
            });
            return resultCache.addOne(manga.user, new MangaUpdateSummary("success", manga));
          })
          .catch((e) => {
            if (verbose) {
              logger.error(UPDATE_MANGA_FAILED, {
                id: manga.id,
                site: manga.site,
                link: manga.link,
                name: manga.name,
                error: "" + e,
              });
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
