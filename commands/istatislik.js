const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "istatistik",

  async execute(message) {
    const guild = message.guild;
    await guild.members.fetch();

    const total = guild.memberCount;
    const bots = guild.members.cache.filter(m => m.user.bot).size;
    const humans = total - bots;

    const textChannels = guild.channels.cache.filter(c => c.type === 0).size;
    const voiceChannels = guild.channels.cache.filter(c => c.type === 2).size;
    const categories = guild.channels.cache.filter(c => c.type === 4).size;

    const embed = new EmbedBuilder()
      .setColor(0xffb6c1)
      .setTitle(`📈 ${guild.name} İstatistik`)
      .setThumbnail(guild.iconURL({ dynamic: true }))
      .setDescription(
        `**Toplam üye:** ${total}\n` +
        `**İnsan:** ${humans}\n` +
        `**Bot:** ${bots}\n` +
        `**Yazı kanalı:** ${textChannels}\n` +
        `**Ses kanalı:** ${voiceChannels}\n` +
        `**Kategori:** ${categories}\n` +
        `**Rol sayısı:** ${guild.roles.cache.size}`
      );

    return message.reply({ embeds: [embed] });
  }
};