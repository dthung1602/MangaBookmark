const { Manga } = require("../models");
const { ScheduledQueue, AdhocQueue } = require("../services/redis-service");
const { PRODUCER_CONCURRENCY } = require("../config");

const Producer = (queueName, filters = [], verbose = false) => {
  let queue;
  if (queueName === "adhoc") {
    queue = AdhocQueue;
  } else if (queueName === "scheduled") {
    queue = ScheduledQueue;
  } else {
    throw Error(`Invalid queue "${queueName}"`);
  }

  return {
    async run() {
      if (verbose) {
        console.log(`Start pushing mangas to ${queueName} queue with filters: ${JSON.stringify(filters)}`);
      }
      const cursor = Manga.find(filters).batchSize(PRODUCER_CONCURRENCY).cursor();

      let end = false;
      let success = 0;
      let failure = 0;
      let promises = [];

      while (!end) {
        const batch = [];

        // get a batch
        for (let i = 0; i < PRODUCER_CONCURRENCY; i++) {
          const manga = await cursor.next();
          if (!manga) {
            end = true;
            break;
          }
          batch.push(manga);
        }

        // push batch to queue
        if (batch.length > 0) {
          const promise = queue
            .push(batch)
            .then((m) => {
              success += batch.length;
              return m;
            })
            .catch((e) => {
              failure += batch.length;
              throw e;
            });
          promises.push(promise);
        }
      }

      // wait for all messages to be pushed
      await Promise.all(promises);

      if (verbose) {
        console.log(`\nQueued ${success}/${success + failure} mangas`);
      }
    },
  };
};

module.exports = Producer;
