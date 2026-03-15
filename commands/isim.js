const config = require("../config");

module.exports = {
  name: "isim",

  async execute(message, args, client) {
    const role1 = "1475457338172379183";
    const role2 = "1475457338164121633";

    if (
      !message.member.roles.cache.has(role1) &&
      !message.member.roles.cache.has(role2)
    ) {
      return message.reply("❌ Bu komutu kullanamazsın.");
    }

    const member =
      message.mentions.members.first() ||
      (await message.guild.members.fetch(args[0]).catch(() => null));

    if (!member) {
      return message.reply("❌ Bir kullanıcı etiketle veya ID gir.");
    }

    const newName = args.slice(1).join(" ");
    if (!newName) {
      return message.reply("❌ Yeni ismi yaz.");
    }

    if (newName.length > 32) {
      return message.reply("❌ İsim en fazla 32 karakter olabilir.");
    }

    try {
      const oldName = member.displayName;
      await member.setNickname(newName);

      const msg = await message.reply(
        `✏️ ${member.user.tag} kullanıcısının ismi değiştirildi.\nEski: ${oldName}\nYeni: ${newName}`
      );

      setTimeout(() => {
        msg.delete().catch(() => {});
      }, 5000);

      const logChannel = client.channels.cache.get(config.logs.mod);
      if (logChannel) {
        logChannel.send(
          `✏️ **İsim Değiştirildi**\n` +
          `Yetkili: ${message.author.tag}\n` +
          `Kullanıcı: ${member.user.tag}\n` +
          `Eski isim: ${oldName}\n` +
          `Yeni isim: ${newName}`
        );
      }
    } catch (error) {
      console.error(error);
      message.reply("❌ İsim değiştirilirken hata oluştu.");
    }
  }
};