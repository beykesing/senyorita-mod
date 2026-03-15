const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "banner",

  async execute(message) {

    const user = message.mentions.users.first() || message.author;

    const fetchedUser = await message.client.users.fetch(user.id, { force: true });

    if (!fetchedUser.banner) {
      return message.reply("Bu kullanıcının bannerı yok.");
    }

    const embed = new EmbedBuilder()
      .setColor("#ffb6c1")
      .setTitle(`${user.username} Banner`)
      .setImage(fetchedUser.bannerURL({ size: 1024 }));

    message.reply({ embeds: [embed] });

  }
};