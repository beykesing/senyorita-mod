const fs = require("fs");
const path = require("path");
const { EmbedBuilder } = require("discord.js");

const xpPath = path.join(__dirname, "..", "data", "xp.json");

function getData() {
  if (!fs.existsSync(xpPath)) fs.writeFileSync(xpPath, "{}");
  return JSON.parse(fs.readFileSync(xpPath, "utf8"));
}

function getLevel(xp) {
  let level = 1;
  let needed = 100;

  while (xp >= needed) {
    xp -= needed;
    level++;
    needed = Math.floor(needed * 1.5);
  }

  return { level, currentXp: xp, needed };
}

module.exports = {
  name: "rank",

  async execute(message) {
    const data = getData();
    const guildId = message.guild.id;
    const userId = message.author.id;

    if (!data[guildId] || !data[guildId][userId]) {
      return message.reply("Henüz XP verin yok.");
    }

    const userData = data[guildId][userId];
    const levelInfo = getLevel(userData.xp);

    const embed = new EmbedBuilder()
      .setColor(0xffb6c1)
      .setTitle("📊 Rank Bilgisi")
      .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
      .setDescription(
        `**Kullanıcı:** ${message.author}\n` +
        `**Seviye:** ${levelInfo.level}\n` +
        `**Toplam XP:** ${userData.xp}\n` +
        `**Mesaj:** ${userData.messages}\n` +
        `**Sonraki seviye için:** ${levelInfo.needed - levelInfo.currentXp} XP`
      );

    return message.reply({ embeds: [embed] });
  }
};