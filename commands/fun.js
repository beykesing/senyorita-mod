const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "fun",

  async execute(message, args) {
    const command = message.content.slice(1).trim().split(/ +/)[0].toLowerCase();

    // ===== RPS =====
    if (command === "rps") {
      const choices = ["taş", "kağıt", "makas"];
      const userChoice = args[0]?.toLowerCase();
      const botChoice = choices[Math.floor(Math.random() * choices.length)];

      if (!userChoice || !choices.includes(userChoice)) {
        return message.reply("Kullanım: `.rps taş / kağıt / makas`");
      }

      let result = "Berabere 🤝";

      if (
        (userChoice === "taş" && botChoice === "makas") ||
        (userChoice === "kağıt" && botChoice === "taş") ||
        (userChoice === "makas" && botChoice === "kağıt")
      ) {
        result = "Sen kazandın 🎉";
      } else if (userChoice !== botChoice) {
        result = "Bot kazandı 😎";
      }

      const embed = new EmbedBuilder()
        .setColor(0x5865f2)
        .setTitle("✂️ Taş Kağıt Makas")
        .setDescription(
          `**Sen:** ${userChoice}\n` +
          `**Bot:** ${botChoice}\n\n` +
          `**Sonuç:** ${result}`
        );

      return message.reply({ embeds: [embed] });
    }

    // ===== PARA =====
    if (command === "para") {
      const result = Math.random() < 0.5 ? "Yazı" : "Tura";

      const embed = new EmbedBuilder()
        .setColor(0xf1c40f)
        .setTitle("🪙 Yazı Tura")
        .setDescription(`**Sonuç:** ${result}`);

      return message.reply({ embeds: [embed] });
    }

    // ===== ŞANSLI SAYI =====
    if (command === "şanslısayı") {
      const number = Math.floor(Math.random() * 100) + 1;

      const embed = new EmbedBuilder()
        .setColor(0x2ecc71)
        .setTitle("🍀 Şanslı Sayı")
        .setDescription(`Bugünkü şanslı sayın: **${number}**`);

      return message.reply({ embeds: [embed] });
    }

    // ===== HACK =====
    if (command === "hack") {
      const user = message.mentions.users.first();

      if (!user) {
        return message.reply("Birini etiketle.");
      }

      const msg = await message.reply(`💻 ${user} hackleniyor...`);

      setTimeout(() => {
        msg.edit(`📂 ${user} dosyaları indiriliyor...`).catch(() => {});
      }, 2000);

      setTimeout(() => {
        msg.edit(`🔑 ${user} şifreleri çözülüyor...`).catch(() => {});
      }, 4000);

      setTimeout(() => {
        msg.edit(`✅ ${user} başarıyla hacklendi! `).catch(() => {});
      }, 6000);

      return;
    }

    // ===== HOWGAY =====
    if (command === "howgay") {
      const user = message.mentions.users.first() || message.author;
      const percent = Math.floor(Math.random() * 101);

      const embed = new EmbedBuilder()
        .setColor(0xff4da6)
        .setTitle("🏳️‍🌈 Gay Ölçer")
        .setThumbnail(user.displayAvatarURL({ dynamic: true }))
        .setDescription(`${user} **%${percent}** gay çıktı.`);

      return message.reply({ embeds: [embed] });
    }

    // ===== HOWCOOL =====
    if (command === "howcool") {
      const user = message.mentions.users.first() || message.author;
      const percent = Math.floor(Math.random() * 101);

      const embed = new EmbedBuilder()
        .setColor(0x3498db)
        .setTitle("😎 Cool Ölçer")
        .setThumbnail(user.displayAvatarURL({ dynamic: true }))
        .setDescription(`${user} **%${percent}** cool çıktı.`);

      return message.reply({ embeds: [embed] });
    }

    // ===== HOWRICH =====
    if (command === "howrich") {
      const user = message.mentions.users.first() || message.author;
      const percent = Math.floor(Math.random() * 101);

      const embed = new EmbedBuilder()
        .setColor(0xf39c12)
        .setTitle("💰 Zenginlik Ölçer")
        .setThumbnail(user.displayAvatarURL({ dynamic: true }))
        .setDescription(`${user} **%${percent}** zengin çıktı.`);

      return message.reply({ embeds: [embed] });
    }

    // ===== SHIP =====
    if (command === "ship") {
      const user1 = message.author;
      let user2 = message.mentions.users.first();

      if (!user2) {
        const members = message.guild.members.cache
          .filter(member => !member.user.bot && member.id !== message.author.id)
          .map(member => member.user);

        if (members.length === 0) {
          return message.reply("Ship için uygun kullanıcı bulunamadı.");
        }

        user2 = members[Math.floor(Math.random() * members.length)];
      }

      const percent = Math.floor(Math.random() * 101);

      let yorum = "Eh işte 😅";
      if (percent >= 90) yorum = "Ruh eşi gibi oldunuz 💍";
      else if (percent >= 75) yorum = "Mükemmel çift 💖";
      else if (percent >= 60) yorum = "Yakışıyorsunuz 😍";
      else if (percent >= 40) yorum = "Olabilir gibi 👀";
      else if (percent >= 20) yorum = "Biraz zor 😬";
      else yorum = "Hiç olmamış 😂";

      const embed = new EmbedBuilder()
        .setColor(0xff69b4)
        .setTitle("💘 Ship Sonucu")
        .setDescription(
          `${user1} ❤️ ${user2}\n\n` +
          `**Uyum:** %${percent}\n` +
          `**Yorum:** ${yorum}`
        )
        .setThumbnail(user1.displayAvatarURL({ dynamic: true, size: 512 }))
        .setImage(user2.displayAvatarURL({ dynamic: true, size: 512 }))
        .setFooter({ text: `${user1.username} & ${user2.username}` });

      return message.reply({ embeds: [embed] });
    }

    // ===== HUG =====
    if (command === "hug") {
      const user = message.mentions.users.first();
      if (!user) return message.reply("Birini etiketle.");

      const embed = new EmbedBuilder()
        .setColor(0xffb6c1)
        .setTitle("🤗 Sarılma")
        .setDescription(`${message.author} ${user} kullanıcısına sarıldı.`);

      return message.reply({ embeds: [embed] });
    }

    // ===== KISS =====
    if (command === "kiss") {
      const user = message.mentions.users.first();
      if (!user) return message.reply("Birini etiketle.");

      const embed = new EmbedBuilder()
        .setColor(0xff66a3)
        .setTitle("💋 Öpücük")
        .setDescription(`${message.author} ${user} kullanıcısını öptü.`);

      return message.reply({ embeds: [embed] });
    }

    // ===== SLAP =====
    if (command === "slap") {
      const user = message.mentions.users.first();
      if (!user) return message.reply("Birini etiketle.");

      const embed = new EmbedBuilder()
        .setColor(0xe74c3c)
        .setTitle("👋 Tokat")
        .setDescription(`${message.author} ${user} kullanıcısına tokat attı.`);

      return message.reply({ embeds: [embed] });
    }

    // ===== PAT =====
    if (command === "pat") {
      const user = message.mentions.users.first();
      if (!user) return message.reply("Birini etiketle.");

      const embed = new EmbedBuilder()
        .setColor(0x95a5a6)
        .setTitle("🫳 Kafa Okşama")
        .setDescription(`${message.author} ${user} kullanıcısının kafasını okşadı.`);

      return message.reply({ embeds: [embed] });
    }

    // ===== UYKU =====
    if (command === "uyku") {
      const embed = new EmbedBuilder()
        .setColor(0x9b59b6)
        .setTitle("😴 Uyku")
        .setDescription(`${message.author} uyumaya gitti.`);

      return message.reply({ embeds: [embed] });
    }

    // ===== ALKIŞ =====
    if (command === "alkış") {
      const embed = new EmbedBuilder()
        .setColor(0xf1c40f)
        .setTitle("👏 Alkış")
        .setDescription(`${message.author} alkışlıyor!`);

      return message.reply({ embeds: [embed] });
    }

    // ===== DANCE =====
    if (command === "dance") {
      const embed = new EmbedBuilder()
        .setColor(0x8e44ad)
        .setTitle("💃 Dans")
        .setDescription(`${message.author} dans ediyor!`);

      return message.reply({ embeds: [embed] });
    }

    // ===== FACEPALM =====
    if (command === "facepalm") {
      const embed = new EmbedBuilder()
        .setColor(0x7f8c8d)
        .setTitle("🤦 Facepalm")
        .setDescription(`${message.author} facepalm attı.`);

      return message.reply({ embeds: [embed] });
    }

    // ===== KEDİ =====
    if (command === "kedi") {
      const cats = [
        "https://cataas.com/cat/cute",
        "https://cataas.com/cat/funny",
        "https://cataas.com/cat/says/MIYAV",
        "https://cataas.com/cat/says/LOL",
        "https://cataas.com/cat/says/SENYORITA"
      ];

      const image = cats[Math.floor(Math.random() * cats.length)];

      const embed = new EmbedBuilder()
        .setColor(0xffb6c1)
        .setTitle("🐱 Komik Kedi")
        .setImage(image);

      return message.reply({ embeds: [embed] });
    }

    // ===== KÖPEK =====
    if (command === "köpek") {
      const dogs = [
        "https://images.dog.ceo/breeds/husky/n02110185_1469.jpg",
        "https://images.dog.ceo/breeds/retriever-golden/n02099601_3004.jpg",
        "https://images.dog.ceo/breeds/poodle-standard/n02113799_351.jpg",
        "https://images.dog.ceo/breeds/shiba/shiba-13.jpg",
        "https://images.dog.ceo/breeds/samoyed/n02111889_1606.jpg"
      ];

      const image = dogs[Math.floor(Math.random() * dogs.length)];

      const embed = new EmbedBuilder()
        .setColor(0xd2b48c)
        .setTitle("🐶 Komik Köpek")
        .setImage(image);

      return message.reply({ embeds: [embed] });
    }

    // ===== AYI =====
    if (command === "ayı") {
      const bears = [
        "https://placebear.com/600/400",
        "https://placebear.com/640/360",
        "https://placebear.com/700/400",
        "https://placebear.com/500/500",
        "https://placebear.com/720/480"
      ];

      const image = bears[Math.floor(Math.random() * bears.length)];

      const embed = new EmbedBuilder()
        .setColor(0x8b4513)
        .setTitle("🐻 Komik Ayı")
        .setImage(image);

      return message.reply({ embeds: [embed] });
    }

    // ===== PANDA =====
if (command === "panda") {
  const pandas = [
    "https://upload.wikimedia.org/wikipedia/commons/0/0f/Grosser_Panda.JPG",
    "https://upload.wikimedia.org/wikipedia/commons/9/9f/Giant_Panda_2.JPG",
    "https://upload.wikimedia.org/wikipedia/commons/f/f3/Giant_Panda_Berlin.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/5/54/Giant_Panda_in_Beijing_Zoo_1.JPG",
    "https://upload.wikimedia.org/wikipedia/commons/6/67/Giant_Panda_eating.jpg"
  ];

  const image = pandas[Math.floor(Math.random() * pandas.length)];

  const embed = new EmbedBuilder()
    .setColor(0x2c3e50)
    .setTitle("🐼 Panda")
    .setImage(image);

  return message.reply({ embeds: [embed] });
}

    // ===== MEME =====
    if (command === "meme") {
      const memes = [
        "😂 Bugünkü meme: Ben botu düzelttim sanarken 14 hata daha çıkması.",
        "🤣 Kod çalışınca dünyanın en mutlu insanı olma hissi.",
        "😅 'Son bir hata kaldı' deyip 2 saat uğraşmak."
      ];

      const text = memes[Math.floor(Math.random() * memes.length)];

      const embed = new EmbedBuilder()
        .setColor(0x00b894)
        .setTitle("😂 Meme")
        .setDescription(text);

      return message.reply({ embeds: [embed] });
    }

    // ===== JOKE =====
    if (command === "joke") {
      const jokes = [
        "Yazılımcı neden denizi sevmez? Çünkü çok fazla bug vardır.",
        "Bilgisayar niye üşüdü? Çünkü Windows açıktı.",
        "Kodum çalıştı, şimdi neden çalıştığını asla değiştirmeyeceğim."
      ];

      const text = jokes[Math.floor(Math.random() * jokes.length)];

      const embed = new EmbedBuilder()
        .setColor(0x16a085)
        .setTitle("😄 Şaka")
        .setDescription(text);

      return message.reply({ embeds: [embed] });
    }

    // ===== FACT =====
    if (command === "fact") {
      const facts = [
        "Ahtapotların 3 kalbi vardır.",
        "Bal arıları matematik benzeri problemleri çözebilir.",
        "Panda günde saatlerce bambu yer."
      ];

      const text = facts[Math.floor(Math.random() * facts.length)];

      const embed = new EmbedBuilder()
        .setColor(0x1abc9c)
        .setTitle("📚 İlginç Bilgi")
        .setDescription(text);

      return message.reply({ embeds: [embed] });
    }
  }
};