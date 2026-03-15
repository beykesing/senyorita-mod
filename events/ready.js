const config = require("../config");
const { joinVoiceChannel } = require("@discordjs/voice");

module.exports = {
  name: "clientReady",
  once: true,

  execute(client) {
    console.log(`🤖 ${client.user.tag} aktif!`);
    console.log(`📊 ${client.guilds.cache.size} sunucuda çalışıyor`);

    client.user.setPresence({
      activities: [{ name: config.status.name, type: 3 }],
      status: "online"
    });

    // ===== SES KANALINA GİRME =====
    const guild = client.guilds.cache.first();

    if (!guild) return;

    const channel = guild.channels.cache.get("1475457338818429044");

    if (!channel) return;

    joinVoiceChannel({
      channelId: channel.id,
      guildId: guild.id,
      adapterCreator: guild.voiceAdapterCreator
    });
  }
};