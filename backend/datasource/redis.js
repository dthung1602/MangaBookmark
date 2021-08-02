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
  async addOne(message, encoder = JSON.stringify) {
    this.connect();
    message = encoder(message);
    return client.rpush("result:" + this.name, message);
  }

  async retrieveAll(decoder = JSON.parse) {
    this.connect();
    const messages = await client.lrange("result:" + this.name, 0, -1);
    const result = messages.map(decoder);
    await client.del(this.name);
    return result;
  }
}

class Counter extends RedisBase {
  async inc(key) {
    this.connect();
    return client.incr("counter:" + this.name + ":" + key);
  }

  async dec(key) {
    this.connect();
    return client.decr("counter:" + this.name + ":" + key);
  }

  async set(key) {
    this.connect();
    return client.set("counter:" + this.name + ":" + key);
  }

  async get(key) {
    this.connect();
    return client.get("counter:" + this.name + ":" + key);
  }
}

class Memo extends RedisBase {
  async set(key, value) {
    this.connect();
    return client.set("memo:" + this.name + ":" + key, value);
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
  Counter,
  Memo,
};
