const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "yardım",

  async execute(message) {
    const embed = new EmbedBuilder()
      .setColor(0xff69b4)
      .setTitle("📜 Komutlar")
      .setDescription(
        `⚙️ **Sistem**\n` +
        `.ping\n` +
        `.yardım\n` +
        `.botbilgi\n` +
        `.afk\n\n` +

        `🛡️ **Moderasyon**\n` +
        `.mute\n` +
        `.unmute\n` +
        `.ban\n` +
        `.kick\n` +
        `.isim\n` +
        `.warn\n` +
        `.unwarn\n` +
        `.sil\n` +
        `.kilit\n\n` +

        `🎮 **Eğlence**\n` +
        `.hug\n` +
        `.kedi\n` +
        `.köpek\n` +
        `.howgay\n` +
        `.hack\n` +
        `.rps\n\n` +

        `📊 **Seviye**\n` +
        `.rank\n` +
        `.leaderboard\n` +
        `.istatistik\n` +
        `.üye-sayı`
      )
      .setFooter({ text: "Senyorita Yardım Menüsü" });

    message.reply({ embeds: [embed] });
  }
};
