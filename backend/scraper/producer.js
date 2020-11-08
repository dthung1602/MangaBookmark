const { Manga } = require("../models");
const { ScheduledQueue } = require("../services/redis-service");

module.exports = async (filters) => {
  console.log("Start queueing mangas with filters: " + JSON.stringify(filters));
  const query = Manga.find(filters);

  let results = [];
  for await (let manga of query) {
    const promise = ScheduledQueue.push(manga)
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
};
