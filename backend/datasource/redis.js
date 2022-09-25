const asyncRedis = require("async-redis");

const { REDIS_URL } = require("../config");

let client = null;

class RedisBase {
  constructor(name) {
    this.name = name;
  }

  connect() {
    if (client) {
      return client;
    }
    client = asyncRedis.createClient(REDIS_URL);
  }

  static async closeConnection() {
    return client.quit();
  }
}

class ResultCache extends RedisBase {
  DEAULT_TTL = 60 * 60;

  async addOne(key, message, encoder = JSON.stringify, expireInSeconds = null) {
    this.connect();
    message = encoder(message);
    key = "result:" + this.name + ":" + key;
    const result = await client.rpush(key, message);
    if (expireInSeconds !== undefined) {
      expireInSeconds = expireInSeconds || this.DEAULT_TTL;
      await client.expire(key, expireInSeconds);
    }
    return result;
  }

  async retrieveAll(key, decoder = JSON.parse) {
    this.connect();
    key = "result:" + this.name + ":" + key;
    const messages = await client.lrange(key, 0, -1);
    await client.del(key);
    return messages.map(decoder);
  }
}

class Memo extends RedisBase {
  async set(key, value, expireInSeconds = null) {
    this.connect();
    const params = expireInSeconds === null ? [value] : [value, "EX", parseInt(expireInSeconds)];
    return client.set("memo:" + this.name + ":" + key, ...params);
  }

  async get(key) {
    this.connect();
    return client.get("memo:" + this.name + ":" + key);
  }

  async pop(key) {
    this.connect();
    return client.getdel("memo:" + this.name + ":" + key);
  }
}

module.exports = {
  ResultCache,
  Memo,
};
