const config = require("../config");
const ms = require("ms");

module.exports = {
  name: "mute",

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
      return message.reply("❌ Susturulacak kullanıcıyı etiketle veya ID gir.");
    }

    if (member.id === message.author.id) {
      return message.reply("❌ Kendine mute atamazsın.");
    }

    if (!member.moderatable) {
      return message.reply("❌ Bu kullanıcıya mute atamıyorum.");
    }

    const timeArg = args[1];
    if (!timeArg) {
      return message.reply("❌ Süre girmen lazım. Örnek: `.mute @kişi 10m`");
    }

    const duration = ms(timeArg);

    if (!duration) {
      return message.reply("❌ Geçerli bir süre gir. Örnek: `10m`, `1h`, `1d`");
    }

    if (duration > 2419200000) {
      return message.reply("❌ En fazla 28 gün mute atabilirsin.");
    }

    const reason = args.slice(2).join(" ") || "Sebep belirtilmedi";

    try {
      await member.timeout(duration, `${message.author.tag}: ${reason}`);

      const replyMsg = await message.reply(
        `🔇 ${member.user.tag} ${timeArg} boyunca susturuldu.\nSebep: ${reason}`
      );

      setTimeout(() => {
        replyMsg.delete().catch(() => {});
      }, 5000);

      const logChannel = client.channels.cache.get(config.logs.mod);

      if (logChannel) {
        logChannel.send(
          `🔇 **Mute İşlemi**\n` +
          `Yetkili: ${message.author.tag}\n` +
          `Kullanıcı: ${member.user.tag} (${member.id})\n` +
          `Süre: ${timeArg}\n` +
          `Sebep: ${reason}`
        );
      }
    } catch (error) {
      console.error(error);
      message.reply("❌ ???????");
    }
  }
};