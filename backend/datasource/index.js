const Queue = require("./queue");
const { ResultCache, Counter, Memo } = require("./redis");

function closeAllConnections() {
  return Promise.allSettled([Queue.closeConnection(), ResultCache.closeConnection()]);
}

module.exports = {
  Queue,
  ResultCache,
  Counter,
  Memo,
  closeAllConnections,
};
