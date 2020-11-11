const { Manga } = require("../models");
const { ScheduledQueue, AdhocQueue } = require("../services/redis-service");

module.exports = (queueName, filters) => {
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
      console.log("Start queueing mangas with filters: " + JSON.stringify(filters));
      const query = Manga.find(filters);

      let results = [];
      for await (let manga of query) {
        const promise = queue
          .push(manga)
          .then((m) => {
            process.stdout.write(".");
            return m;
          })
          .catch((e) => {
            process.stdout.write("x");
            throw e;
          });
        results.push(promise);
      }

      results = await Promise.all(results);
      const total = results.length;
      const success = results.filter((e) => !(e instanceof Error)).length;

      console.log(`\nQueued ${success}/${total} mangas`);
    },
  };
};
