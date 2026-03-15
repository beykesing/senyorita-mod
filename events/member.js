module.exports = {
  name: "guildMemberAdd",

  async execute(member) {

    const unregisterRole = member.guild.roles.cache.get("1475457338130567340");
    if (unregisterRole) await member.roles.add(unregisterRole).catch(() => {});

    const registerChannel = member.guild.channels.cache.get("1475457338482888767");

    if (registerChannel) {
      registerChannel.send(
        `💖 Sunucuya hoş geldin ${member}!\n` +
        `Kayıt olmak için yetkilileri bekle.`
      );
    }

  }
};