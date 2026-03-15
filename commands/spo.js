const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "spo",

  async execute(message) {

    const activities = message.member.presence?.activities;
    const spotify = activities?.find(a => a.name === "Spotify");

    if (!spotify) {
      return message.reply("🎧 müzik dinlemiyorsun ki.");
    }

    const song = spotify.details;
    const artist = spotify.state;
    const trackId = spotify.syncId;

    const url = `https://open.spotify.com/track/${trackId}`;

    let cover = null;
    const largeImage = spotify.assets?.largeImage;

    if (largeImage && largeImage.startsWith("spotify:")) {
      const imageId = largeImage.split(":")[1];
      cover = `https://i.scdn.co/image/${imageId}`;
    }

    const embed = new EmbedBuilder()
      .setColor("#1DB954")
      .setAuthor({
        name: `${message.author.username} Spotify dinliyor`,
        iconURL: "https://cdn-icons-png.flaticon.com/512/174/174872.png"
      })
      .setDescription(`🎵 **${song}**\n${artist}`)
      .setThumbnail(cover)
      .setURL(url);

    message.reply({ embeds: [embed] });

  }
};