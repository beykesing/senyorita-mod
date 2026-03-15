const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "botbilgi",

  async execute(message) {
    const embed = new EmbedBuilder()
      .setColor(0xffb6c1)
      .setTitle("🤖 Bot Bilgisi")
      .setDescription(
        `**İsim:** ${message.client.user.tag}\n` +
        `**Sunucu sayısı:** ${message.client.guilds.cache.size}\n` +
        `**Ping:** ${message.client.ws.ping}ms\n` +
        `**Prefix:** .`
      );

    return message.reply({ embeds: [embed] });
  }
};