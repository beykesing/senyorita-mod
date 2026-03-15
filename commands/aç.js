const config = require("../config");
const { PermissionsBitField } = require("discord.js");

module.exports = {
  name: "aç",

  async execute(message, args, client) {
    const chatRole = "1481508485723328653";
    const adminRole = "1475457338172379183";

    if (
      !message.member.roles.cache.has(chatRole) &&
      !message.member.roles.cache.has(adminRole) &&
      !message.member.permissions.has(PermissionsBitField.Flags.Administrator)
    ) {
      return message.reply("❌ Bu komutu kullanamazsın.");
    }

    try {
      await message.channel.permissionOverwrites.edit(
        message.guild.roles.everyone,
        {
          SendMessages: true
        }
      );

      const msg = await message.channel.send("🔓 Kanal açıldı.");

      setTimeout(() => {
        msg.delete().catch(() => {});
      }, 5000);

      const logChannel = client.channels.cache.get(config.logs.mod);
      if (logChannel) {
        logChannel.send(
          `🔓 **Kanal Açıldı**\n` +
          `Yetkili: ${message.author.tag}\n` +
          `Kanal: ${message.channel}`
        );
      }
    } catch (error) {
      console.error(error);
      message.reply("❌ Kanal açılırken hata oluştu.");
    }
  }
};