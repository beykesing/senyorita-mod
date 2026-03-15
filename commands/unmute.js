const config = require("../config");

module.exports = {
  name: "unmute",

  async execute(message, args, client) {

    const role1 = "1481508485723328653";
    const role2 = "1475457338172379183";

    if (
      !message.member.roles.cache.has(role1) &&
      !message.member.roles.cache.has(role2)
    ) {
      return message.reply("❌ Bu komutu kullanamazsın.");
    }

    const member = message.mentions.members.first();

    if (!member)
      return message.reply("❌ Bir kullanıcı etiketle.");

    await member.timeout(null);

    const msg = await message.reply(`🔊 ${member.user.tag} susturması kaldırıldı.`);

    setTimeout(() => {
      msg.delete().catch(() => {});
    }, 5000);

    const logChannel = client.channels.cache.get(config.logs.mod);

    if (logChannel) {
      logChannel.send(
        `🔊 **Unmute**\n` +
        `Yetkili: ${message.author.tag}\n` +
        `Kullanıcı: ${member.user.tag}`
      );
    }

  }
};