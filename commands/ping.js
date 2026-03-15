module.exports = {
  name: "ping",

  async execute(message) {
    return message.reply(`🏓 Pong! Gecikme: ${message.client.ws.ping}ms`);
  }
};