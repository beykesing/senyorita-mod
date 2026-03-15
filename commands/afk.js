const fs = require("fs");
const path = require("path");

const afkPath = path.join(__dirname, "..", "data", "afk.json");

module.exports = {
  name: "afk",

  async execute(message, args) {
    const reason = args.join(" ") || "Sebep belirtilmedi";

    let afkData = {};

    if (fs.existsSync(afkPath)) {
      afkData = JSON.parse(fs.readFileSync(afkPath, "utf8"));
    }

    afkData[message.author.id] = {
      reason: reason,
      time: Date.now()
    };

    fs.writeFileSync(afkPath, JSON.stringify(afkData, null, 2));

    if (!message.member.displayName.startsWith("[AFK] ")) {
      message.member.setNickname(`[AFK] ${message.member.displayName}`).catch(() => {});
    }

    const afkReply = await message.reply("💤 AFK moduna girdiniz.");

    setTimeout(() => {
      afkReply.delete().catch(() => {});
    }, 5000);
  }
};