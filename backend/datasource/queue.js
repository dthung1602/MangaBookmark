const amqplib = require("amqplib");

const { AMQP_URL } = require("../config");

let connection = null;

class Queue {
  constructor(name) {
    this.name = name;
    this.channel = null;
  }

  async connect() {
    if (this.channel) {
      return this.channel;
    }
    if (connection === null) {
      return amqplib
        .connect(AMQP_URL)
        .then((conn) => (connection = conn))
        .then(this.createChannelAndQueue);
    }
    return this.createChannelAndQueue();
  }

  createChannelAndQueue() {
    return connection.createChannel().then((ch) => {
      this.channel = ch;
      return ch.assertQueue(this.name);
    });
  }

  async enqueue(message, encoder = JSON.stringify) {
    await this.connect();
    message = encoder(message);
    return this.channel.sendToQueue(this.name, Buffer.from(message));
  }

  async retrieve(decoder = JSON.parse) {
    await this.connect();
    let message = await this.channel.get(this.name, { noAck: true });
    if (message === false) {
      return false;
    }
    return decoder(message);
  }
}

module.exports = Queue;
