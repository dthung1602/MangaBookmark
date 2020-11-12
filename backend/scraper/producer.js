const { Manga } = require("../models");
const { ScheduledQueue, AdhocQueue } = require("../services/redis-service");

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
      const query = Manga.find(filters);

      let results = [];
      for await (let manga of query) {
        const promise = queue
          .push(manga)
          .then((m) => {
            if (verbose) {
              process.stdout.write(".");
            }
            return m;
          })
          .catch((e) => {
            if (verbose) {
              process.stdout.write("x");
            }
            throw e;
          });
        results.push(promise);
      }

      results = await Promise.all(results);
      const total = results.length;
      const success = results.filter((e) => !(e instanceof Error)).length;

      if (verbose) {
        console.log(`\nQueued ${success}/${total} mangas`);
      }
    },
  };
};

module.exports = Producer;
