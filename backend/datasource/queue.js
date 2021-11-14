const amqplib = require("amqplib");

const { getLogger, CONNECTION_ERROR } = require("../services/log-service");
const { AMQP_URL } = require("../config");

const logger = getLogger("queue");
const logError = (error) => logger.log(CONNECTION_ERROR, { error: error + "" });

let connection = null;
const connectionPromise = amqplib
  .connect(AMQP_URL)
  .then((conn) => (connection = conn))
  .catch(logError);

class Queue {
  constructor(name) {
    this.name = name;
    this.channel = null;
    this.channelPromise = connectionPromise
      .then(() => connection.createChannel())
      .then((ch) => {
        this.channel = ch;
        return ch.assertQueue(this.name);
      })
      .catch(logError);
  }

  static async closeConnection() {
    return connection.close();
  }

  async enqueue(message, encoder = JSON.stringify) {
    await this.channelPromise;
    message = encoder(message);
    return this.channel.sendToQueue(this.name, Buffer.from(message));
  }

  async retrieve(decoder = JSON.parse) {
    await this.channelPromise;
    let message = await this.channel.get(this.name, { noAck: true });
    if (message === false) {
      return false;
    }
    return decoder(message.content.toString());
  }
}

module.exports = Queue;
