module.exports = {
  name: "üye-sayı",

  async execute(message) {
    return message.reply(`👥 Sunucuda toplam **${message.guild.memberCount}** üye var.`);
  }
};