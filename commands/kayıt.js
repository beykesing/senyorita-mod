module.exports = {
  name: "kayıt",

  async execute(message, args, client) {

    const registerRole = "1475457338164121634";
    const adminRole = "1475457338172379183";

    if (
      !message.member.roles.cache.has(registerRole) &&
      !message.member.roles.cache.has(adminRole) &&
      !message.member.permissions.has("Administrator")
    ) {
      return message.reply("❌ Bu komutu kullanamazsın.");
    }

    const member = message.mentions.members.first();
    if (!member) return message.reply("Bir kullanıcı etiketle.");

    const name = args[1];
    if (!name) return message.reply("Kullanım: `.kayıt @kişi isim`");

    const unregisterRole = "1475457338130567340";
    const memberRole = "1476662501901865030";

    // rol değiştir
    await member.roles.remove(unregisterRole).catch(() => {});
    await member.roles.add(memberRole).catch(() => {});

    // isim değiştir
    await member.setNickname(name).catch(() => {});

    // genel chate hoş geldin
    const chatChannel = message.guild.channels.cache.get("1475457338935873668");

    if (chatChannel) {
      chatChannel.send(`🎉 Aramıza hoş geldin ${member}!`);
    }

    // kayıt log
    const logChannel = message.guild.channels.cache.get("1481728730203164744");

    if (logChannel) {
      logChannel.send(
        `📋 Yeni kayıt\n` +
        `Yetkili: ${message.author}\n` +
        `Kullanıcı: ${member}\n` +
        `İsim: ${name}`
      );
    }

  }
};