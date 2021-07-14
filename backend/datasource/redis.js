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
}

class ResultCache extends RedisBase {
  async addOne(message, encoder = JSON.stringify) {
    this.connect();
    message = encoder(message);
    return client.rpush(this.name, message);
  }

  async retrieveAll(decoder = JSON.parse) {
    this.connect();
    const messages = await client.lrange(this.name, 0, -1);
    const result = messages.map(decoder);
    await client.del(this.name);
    return result;
  }
}

class Counter extends RedisBase {
  async inc(key) {
    this.connect();
    return client.incr(this.name + ":" + key);
  }

  async dec(key) {
    this.connect();
    return client.decr(this.name + ":" + key);
  }
}

class Memo extends RedisBase {
  async set(key, value) {
    this.connect();
    return client.set(this.name + ":" + key, value);
  }

  async pop(key) {
    this.connect();
    return client.getdel(this.name + ":" + key);
  }
}

module.exports = {
  ResultCache,
  Counter,
  Memo,
};
