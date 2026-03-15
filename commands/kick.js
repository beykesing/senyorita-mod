const config = require("../config");

module.exports = {
  name: "kick",

  async execute(message, args, client) {

    const chatRole = "1481508485723328653";
const adminRole = "1475457338172379183";

if (
  !message.member.roles.cache.has(chatRole) &&
  !message.member.roles.cache.has(adminRole) &&
  !message.member.permissions.has("Administrator")
) {
  return message.reply("❌ Bu komutu kullanamazsın.");
}

    const member =
      message.mentions.members.first() ||
      (await message.guild.members.fetch(args[0]).catch(() => null));

    if (!member) {
      return message.reply("❌ Atılacak kullanıcıyı etiketle veya ID gir.");
    }

    if (member.id === message.author.id) {
      return message.reply("❌ Kendini atamazsın.");
    }

    if (!member.kickable) {
      return message.reply("❌ Bu kullanıcıyı atamıyorum.");
    }

    const reason = args.slice(1).join(" ") || "Sebep belirtilmedi";

    try {

      await member.kick(`${message.author.tag}: ${reason}`);

      const msg = await message.reply(
        `👢 ${member.user.tag} sunucudan atıldı.\nSebep: ${reason}`
      );

      setTimeout(() => {
        msg.delete().catch(() => {});
      }, 5000);

      const logChannel = client.channels.cache.get(config.logs.mod);

      if (logChannel) {
        logChannel.send(
          `👢 **Kick İşlemi**\n` +
          `Yetkili: ${message.author.tag}\n` +
          `Kullanıcı: ${member.user.tag}\n` +
          `Sebep: ${reason}`
        );
      }

    } catch (error) {

      console.error(error);
      message.reply("❌ Kick atılırken hata oluştu.");

    }

  }
};