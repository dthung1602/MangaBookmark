const Queue = require("./queue");
const { ResultCache, Counter, Memo } = require("./redis");

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

module.exports = {
  Queue,
  ResultCache,
  Counter,
  Memo,
  getMangaUpdateQueue,
  getMangaUpdateResultCache,
  getMangaUpdateStatusMemo,
  closeAllConnections,
};
