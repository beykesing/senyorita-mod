const config = require("../config");

module.exports = {
  name: "b4n",

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
      return message.reply("❌ Banlanacak kullanıcıyı etiketle veya ID gir.");
    }

    if (member.id === message.author.id) {
      return message.reply("❌ Kendini banlayamazsın.");
    }

    if (!member.bannable) {
      return message.reply("❌ Bu kullanıcıyı banlayamıyorum :( .");
    }

    const reason = args.slice(1).join(" ") || "Sebep belirtilmedi";

    try {

      await member.ban({ reason: `${message.author.tag}: ${reason}` });

      const msg = await message.reply(
        `🔨 ${member.user.tag} yasaklandı.\nSebep: ${reason}`
      );

      setTimeout(() => {
        msg.delete().catch(() => {});
      }, 5000);

      const logChannel = client.channels.cache.get(config.logs.mod);

      if (logChannel) {
        logChannel.send(
          `🔨 **Ban İşlemi**\n` +
          `Yetkili: ${message.author.tag}\n` +
          `Kullanıcı: ${member.user.tag}\n` +
          `Sebep: ${reason}`
        );
      }

    } catch (error) {

      console.error(error);
      message.reply("❌ Ban atılırken hata oluştu.");

    }

  }
};