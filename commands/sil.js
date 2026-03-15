const config = require("../config");

module.exports = {
  name: "sil",

  async execute(message, args, client) {

    const role1 = "1481508485723328653"; // Chat Yönetici
    const role2 = "1475457338172379183"; // Yönetici

    if (
      !message.member.roles.cache.has(role1) &&
      !message.member.roles.cache.has(role2)
    ) {
      return message.reply("❌ Bu komutu kullanamazsın.");
    }

    const amount = parseInt(args[0]);

    if (!amount || amount < 1 || amount > 100)
      return message.reply("❌ 1 ile 100 arasında sayı gir.");

    await message.channel.bulkDelete(amount, true);

    const msg = await message.channel.send(`🧹 ${amount} mesaj silindi.`);

    setTimeout(() => {
      msg.delete().catch(() => {});
    }, 5000);

    // LOG
    const logChannel = client.channels.cache.get(config.logs.mod);

    if (logChannel) {
      logChannel.send(
        `🧹 **Mesaj Silme**\n` +
        `Yetkili: ${message.author.tag}\n` +
        `Kanal: ${message.channel}\n` +
        `Silinen mesaj: ${amount}`
      );
    }
  }
};