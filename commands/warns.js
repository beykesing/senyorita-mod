const fs = require("fs");
const path = require("path");

const warnPath = path.join(__dirname, "..", "data", "warns.json");

module.exports = {
  name: "warns",

  async execute(message, args) {
    const role1 = "1475457338172379183";
    const role2 = "1475457338164121633";
    const role3 = "1481508485723328653";

    if (
      !message.member.roles.cache.has(role1) &&
      !message.member.roles.cache.has(role2) &&
      !message.member.roles.cache.has(role3)
    ) {
      return message.reply("❌ Bu komutu kullanamazsın.");
    }

    const member = message.mentions.members.first();

    if (!member) {
      return message.reply("❌ Bir kullanıcı etiketle.");
    }

    if (!fs.existsSync(warnPath)) {
      return message.reply("❌ Warn verisi bulunamadı.");
    }

    const warnData = JSON.parse(fs.readFileSync(warnPath, "utf8"));

    if (!warnData[member.id] || warnData[member.id].length === 0) {
      return message.reply(`✅ ${member.user.tag} kullanıcısının warnı yok.`);
    }

    let text = `⚠️ ${member.user.tag} warn listesi:\n\n`;

    warnData[member.id].forEach((warn, index) => {
      text += `${index + 1}. Sebep: ${warn.reason}\nYetkili: ${warn.moderator}\nTarih: ${warn.date}\n\n`;
    });

    message.reply(text);
  }
};