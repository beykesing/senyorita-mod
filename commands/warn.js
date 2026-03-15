const fs = require("fs");
const path = require("path");
const config = require("../config");

const warnPath = path.join(__dirname, "..", "data", "warns.json");

module.exports = {
  name: "warn",

  async execute(message, args, client) {
    
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

    const reason = args.slice(1).join(" ") || "Sebep belirtilmedi";

    let warnData = {};

    if (fs.existsSync(warnPath)) {
      warnData = JSON.parse(fs.readFileSync(warnPath));
    }

    if (!warnData[member.id]) {
      warnData[member.id] = [];
    }

    warnData[member.id].push({
      reason: reason,
      moderator: message.author.tag,
      date: new Date().toLocaleString("tr-TR")
    });

    fs.writeFileSync(warnPath, JSON.stringify(warnData, null, 2));

    const warnCount = warnData[member.id].length;

    const msg = await message.reply(
      `⚠️ ${member.user.tag} uyarıldı.\nSebep: ${reason}\nToplam warn: ${warnCount}`
    );

    setTimeout(() => {
      msg.delete().catch(() => {});
    }, 5000);

    const logChannel = client.channels.cache.get(config.logs.mod);

    if (logChannel) {
      logChannel.send(
        `⚠️ **Warn**\n` +
        `Yetkili: ${message.author.tag}\n` +
        `Kullanıcı: ${member.user.tag}\n` +
        `Sebep: ${reason}\n` +
        `Toplam Warn: ${warnCount}`
      );
    }
  }
};