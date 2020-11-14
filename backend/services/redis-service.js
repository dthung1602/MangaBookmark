const redisService = require("async-redis");

const { REDIS_URL } = require("../config");

let client = null;
let blockingClient = null;

const open = () => {
  client = redisService.createClient(REDIS_URL);
  blockingClient = redisService.createClient(REDIS_URL);

  client.on("error", function (err) {
    console.log("Redis Error: " + err);
  });
  blockingClient.on("error", function (err) {
    console.log("Redis Error: " + err);
  });
};

const quit = () => {
  if (client) {
    client.quit();
  }
  if (blockingClient) {
    blockingClient.quit();
  }
};

const normalizeInput = (value) => {
  if (Array.isArray(value)) {
    return value.map(JSON.stringify);
  }
  return JSON.stringify(value);
};

const Queue = (name) => {
  const push = (value) => client.rpush(name, normalizeInput(value));
  const pop = (n = 1) => {
    let result;
    if (n === 1) {
      result = client.lpop(name);
    } else {
      result = client.lrange(name, 0, n - 1).then((res) => client.ltrim(name, 0, n - 1).then(() => res));
    }
    return result.then((value) => JSON.parse(value));
  };
  const bpop = (timeout = 0) => blockingClient.blpop(name, timeout).then((value) => JSON.parse(value[1]));
  return { name, push, pop, bpop };
};

const Result = (name) => {
  const push = (key, value) => {
    key = name + ":" + key;
    value = normalizeInput(value);
    return client.rpush(key, value);
  };
  const bpop = (key, timeout = 0) =>
    blockingClient.blpop(name + ":" + key, timeout).then((value) => JSON.parse(value[1]));
  const popAll = async (key) => {
    key = name + ":" + key;
    const result = await client.lrange(key, 0, -1);
    await client.ltrim(key, 0, -1);
    return JSON.parse(result);
  };
  const count = (key) => client.lrange(name + ":" + key, 0, -1).then((res) => res.length);
  return { push, bpop, popAll, count };
};

const Cache = (name) => {
  const set = (value) => client.set(name, value);
  const get = () => client.get(name);
  const incr = (num) => client.incr(name, num);
  const decr = (num) => client.decr(name, num);
  return { set, get, incr, decr };
};

module.exports = {
  open,
  quit,
  ScheduledQueue: Queue("scheduled-queue"),
  ScheduledScrapeResult: Result("scheduled-scrape-result"),
  AdhocQueue: Queue("adhoc-queue"),
  AdhocScrapeResult: Result("adhoc-scrape-result"),
  AdhocScrapeResultCount: Cache("adhoc-scrape-result-count"),
};
