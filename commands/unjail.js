const config = require("../config");

module.exports = {
  name: "unjail",

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
      return message.reply("❌ Jail'den çıkarılacak kullanıcıyı etiketle veya ID gir.");
    }

    const jailRoleId = "1482459780198170916";

    try {
      await member.roles.remove(jailRoleId).catch(() => {});

      const msg = await message.reply(
        `🔓 ${member.user.tag} jail'den çıkarıldı.`
      );

      setTimeout(() => {
        msg.delete().catch(() => {});
      }, 5000);

      const logChannel = client.channels.cache.get(config.logs.mod);

      if (logChannel) {
        logChannel.send(
          `🔓 **Unjail İşlemi**\n` +
          `Yetkili: ${message.author.tag}\n` +
          `Kullanıcı: ${member.user.tag} (${member.id})`
        );
      }
    } catch (error) {
      console.error(error);
      message.reply("❌ Unjail sırasında hata oluştu.");
    }
  }
};