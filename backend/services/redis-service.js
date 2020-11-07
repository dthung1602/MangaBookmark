const redisService = require("async-redis");

const { REDIS_URL } = require("../config");

const client = redisService.createClient(REDIS_URL);

client.on("error", function (err) {
  console.log("Redis Error: " + err);
});

const Queue = (name) => {
  const push = (value) => client.rpush(name, value);
  const pop = (n = 1) => {
    if (n === 1) {
      return client.lpop(name);
    }
    const result = client.lrange(0, n - 1);
    client.ltrim(0, n - 1);
    return result;
  };
  const bpop = (timeout = 0) => client.blpop(name, timeout);
  return { name, push, pop, bpop };
};

const Result = (name) => {
  const push = (key, value) => client.rpush(name + ":" + key, value);
  const bpop = (key, timeout = 0) => client.blpop(name + ":" + key, timeout);
  const count = (key) => client.lrange(name + ":" + key, 0, -1).then((res) => res.length);
  return { push, bpop, count };
};

const Cache = (name) => {
  const set = (value) => client.set(name, value);
  const get = () => client.get(name);
  const incr = (num) => client.incr(name, num);
  const decr = (num) => client.decr(name, num);
  return { set, get, incr, decr };
};

module.exports = {
  ScheduledQueue: Queue("scheduled-queue"),
  ScheduledScrapeResult: Result("scheduled-scrape-result"),
  AdhocQueue: Queue("adhoc-queue"),
  AdhocScrapeResult: Result("adhoc-scrape-result"),
  AdhocScrapeResultCount: Cache("adhoc-scrape-result-count"),
};
