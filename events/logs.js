const config = require("../config");

module.exports = {
  name: "messageDelete",

  async execute(message, client) {
    if (!message.guild) return;
    if (message.author?.bot) return;

    const logChannel = client.channels.cache.get(config.logs.message);
    if (!logChannel) return;

    logChannel.send(
      `🗑️ **Mesaj Silindi**\n` +
      `Kullanıcı: ${message.author.tag}\n` +
      `Kanal: ${message.channel}\n` +
      `Mesaj: ${message.content || "İçerik yok"}`
    );
  }
};