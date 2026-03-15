const fs = require("fs");
const path = require("path");
const { EmbedBuilder } = require("discord.js");

const xpPath = path.join(__dirname, "..", "data", "xp.json");

function getData() {
  if (!fs.existsSync(xpPath)) fs.writeFileSync(xpPath, "{}");
  return JSON.parse(fs.readFileSync(xpPath, "utf8"));
}

module.exports = {
  name: "leaderboard",

  async execute(message) {
    const data = getData();
    const guildId = message.guild.id;

    if (!data[guildId] || Object.keys(data[guildId]).length === 0) {
      return message.reply("Henüz sıralama verisi yok.");
    }

    const sorted = Object.entries(data[guildId])
      .sort((a, b) => b[1].xp - a[1].xp)
      .slice(0, 10);

    let text = "";
    for (let i = 0; i < sorted.length; i++) {
      const [userId, userData] = sorted[i];
      text += `**${i + 1}.** <@${userId}> — ${userData.xp} XP\n`;
    }

    const embed = new EmbedBuilder()
      .setColor(0xffb6c1)
      .setTitle("🏆 Leaderboard")
      .setDescription(text);

    return message.reply({ embeds: [embed] });
  }
};