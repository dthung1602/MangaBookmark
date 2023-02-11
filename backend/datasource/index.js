import Queue from "./queue.js";
import redis from "./redis.js";
const { ResultCache, Counter, Memo } = redis;

function closeAllConnections() {
  return Promise.allSettled([Queue.closeConnection(), ResultCache.closeConnection()]);
}

function getMangaUpdateQueue(type) {
  return new Queue(`manga-update:${type}`);
}

function getMangaUpdateResultCache(type) {
  return new ResultCache(`manga-update:${type}`);
}

function getMangaUpdateStatusMemo() {
  return new Memo("manga-update-status");
}

export {
  Queue,
  ResultCache,
  Counter,
  Memo,
  getMangaUpdateQueue,
  getMangaUpdateResultCache,
  getMangaUpdateStatusMemo,
  closeAllConnections,
};
export default {
  Queue,
  ResultCache,
  Counter,
  Memo,
  getMangaUpdateQueue,
  getMangaUpdateResultCache,
  getMangaUpdateStatusMemo,
  closeAllConnections,
};
