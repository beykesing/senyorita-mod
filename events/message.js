const config = require("../config");
const fs = require("fs");
const path = require("path");
const { EmbedBuilder } = require("discord.js");

// ===== PATHS =====
const afkPath = path.join(__dirname, "..", "data", "afk.json");
const xpPath = path.join(__dirname, "..", "data", "xp.json");

// ===== SPAM GUARD =====
const spamMap = new Map();

const SPAM_LIMIT = 5;
const SPAM_INTERVAL = 3000;
const SPAM_TIMEOUT = 10 * 60 * 1000;

const BYPASS_IDS = [
  "463348157305061391",
  "796411946618191872",
  "930774158210650112"
];

function formatAfkTime(ms) {
  const seconds = Math.floor(ms / 1000) % 60;
  const minutes = Math.floor(ms / 1000 / 60) % 60;
  const hours = Math.floor(ms / 1000 / 60 / 60);

  let text = "";
  if (hours > 0) text += `${hours} saat `;
  if (minutes > 0) text += `${minutes} dakika `;
  if (seconds > 0) text += `${seconds} saniye`;

  return text.trim() || "0 saniye";
}

function readJson(filePath) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "{}");
  }
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

module.exports = {
  name: "messageCreate",

  async execute(message, client) {
    if (message.author.bot) return;
    if (!message.guild) return;
// ===== REAL FOTO REACTION =====

if (message.channel.id === "1475498597440028842") {

  if (message.attachments.size > 0) {

    const attachment = message.attachments.first();
    const url = attachment.url;

    const imageRegex = /\.(jpg|jpeg|png|webp|gif)$/i;

    if (imageRegex.test(url)) {
      try {
        await message.react("💗");
      } catch (err) {
        console.error("Reaction hatası:", err);
      }
    }

  }

}
    // ===== GIF GUARD =====

const gifRoles = [
  "1475457338176700532",
  "1475457338176700531",
  "1475457338176700530",
  "1475457338176700529",
  "1477671902934863984"
];

const hasGifRole = message.member.roles.cache.some(role => gifRoles.includes(role.id));

const gifRegex = /(https?:\/\/.*\.(?:gif)|tenor\.com|giphy\.com|media\.tenor\.com)/i;

if (gifRegex.test(message.content) && !hasGifRole) {

  await message.delete().catch(() => {});

  const warnMsg = await message.channel.send(
    `🚫 ${message.author} sadece belirli roller GIF atabilir.`
  );

  setTimeout(() => {
    warnMsg.delete().catch(() => {});
  }, 5000);

  const logChannel = client.channels.cache.get("1481474881261404302");

  if (logChannel) {
    logChannel.send(
      `🚫 **GIF Guard**\n` +
      `Kullanıcı: ${message.author.tag}\n` +
      `Kanal: ${message.channel}\n` +
      `Mesaj: ${message.content}`
    );
  }

  return;
}
    // ===== SPAM GUARD =====
    if (
      !message.member.permissions.has("Administrator") &&
      !BYPASS_IDS.includes(message.author.id)
    ) {
      const now = Date.now();
      const userData = spamMap.get(message.author.id) || {
        count: 0,
        first: now
      };

      if (now - userData.first > SPAM_INTERVAL) {
        userData.count = 0;
        userData.first = now;
      }

      userData.count += 1;
      spamMap.set(message.author.id, userData);

      if (userData.count >= SPAM_LIMIT) {
        try {
          const fetched = await message.channel.messages.fetch({ limit: 50 });
          const userMessages = fetched
            .filter(m => m.author.id === message.author.id)
            .first(10);

          if (userMessages.length > 0) {
            await message.channel.bulkDelete(userMessages, true).catch(() => {});
          }

          if (message.member.moderatable) {
            await message.member.timeout(SPAM_TIMEOUT, "Spam Guard");
          }

          const warnMsg = await message.channel.send(
            `🚫 ${message.author} spam yaptığı için 10 dakika susturuldu.`
          );

          setTimeout(() => {
            warnMsg.delete().catch(() => {});
          }, 5000);

          const logChannel = client.channels.cache.get(config.logs.mod);
          if (logChannel) {
            logChannel.send(
              `🚫 **Spam Guard**\n` +
              `Kullanıcı: ${message.author.tag}\n` +
              `Kanal: ${message.channel}\n` +
              `Ceza: 10 dakika timeout`
            );
          }
        } catch (error) {
          console.error("Spam guard hatası:", error);
        } finally {
          spamMap.delete(message.author.id);
        }

        return;
      }
    }

    // ===== INVITE GUARD =====
    if (
      !message.member.permissions.has("Administrator") &&
      !BYPASS_IDS.includes(message.author.id)
    ) {
      const inviteRegex = /(discord\.gg\/|discord\.com\/invite\/)/i;

      if (inviteRegex.test(message.content)) {
        await message.delete().catch(() => {});

        const warnMsg = await message.channel.send(
          `🚫 ${message.author} sunucuda davet linki paylaşamazsın.`
        );

        setTimeout(() => {
          warnMsg.delete().catch(() => {});
        }, 5000);

        const logChannel = client.channels.cache.get(config.logs.mod);
        if (logChannel) {
          logChannel.send(
            `🚫 **Reklam Guard**\n` +
            `Kullanıcı: ${message.author.tag}\n` +
            `Kanal: ${message.channel}\n` +
            `Mesaj: Davet linki`
          );
        }

        return;
      }
    }

    // ===== AFK DATA =====
    let afkData = readJson(afkPath);

    // ===== AFK ÇIKIŞ =====
    if (afkData[message.author.id] && !message.content.startsWith(".afk")) {
      const afkInfo = afkData[message.author.id];
      const afkDuration = Date.now() - afkInfo.time;

      delete afkData[message.author.id];
      writeJson(afkPath, afkData);

      if (message.member.displayName.startsWith("[AFK] ")) {
        message.member
          .setNickname(message.member.displayName.replace("[AFK] ", ""))
          .catch(() => {});
      }

      const exitMsg = await message.reply(
        `✅ AFK modundan çıktınız. ${formatAfkTime(afkDuration)} AFK kaldınız.`
      );

      setTimeout(() => {
        exitMsg.delete().catch(() => {});
      }, 5000);
    }

    // ===== AFK ETİKETLEME =====
    if (message.mentions.users.size > 0) {
      const mentionedUser = message.mentions.users.first();

      if (mentionedUser && afkData[mentionedUser.id]) {
        const afkInfo = afkData[mentionedUser.id];
        const afkDuration = Date.now() - afkInfo.time;

        const afkMsg = await message.reply(
          `💤 ${mentionedUser.username} ${formatAfkTime(afkDuration)} süredir "${afkInfo.reason}" sebebiyle AFK.`
        );

        setTimeout(() => {
          afkMsg.delete().catch(() => {});
        }, 10000);
      }
    }

    // ===== SELAM SİSTEMİ =====
    const greetings = [
      "sa",
      "selam",
      "slm",
      "s.a",
      "selamın aleyküm",
      "sea"
    ];

    if (greetings.includes(message.content.toLowerCase())) {
      const responses = [
        "Aleyküm selam, hoş geldin 🌸",
        "Selam! Aramıza hoş geldin 💖",
        "Aleyküm selam, iyi sohbetler 💫",
        "Hoş geldin! Seni görmek güzel 🌷",
        "Selam! Keyifli sohbetler ✨",
        "Aleyküm selam, hoş geldin prenses 👑"
      ];

      const random = responses[Math.floor(Math.random() * responses.length)];

      const embed = new EmbedBuilder()
        .setColor(0xffb6c1)
        .setDescription(random)
        .setFooter({ text: message.author.username });

      return message.reply(random);
    }

    // ===== XP SİSTEMİ =====
    const xpData = readJson(xpPath);
    if (!xpData[message.guild.id]) xpData[message.guild.id] = {};
    if (!xpData[message.guild.id][message.author.id]) {
      xpData[message.guild.id][message.author.id] = {
        xp: 0,
        messages: 0
      };
    }

    xpData[message.guild.id][message.author.id].xp += Math.floor(Math.random() * 11) + 5;
    xpData[message.guild.id][message.author.id].messages += 1;
    writeJson(xpPath, xpData);

    // ===== KOMUT SİSTEMİ =====
    const prefix = config.prefix;
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift()?.toLowerCase();
    if (!commandName) return;

    let command = client.commands.get(commandName);

    const funCommands = [
  "rps",
  "para",
  "şanslısayı",
  "hack",
  "howgay",
  "howcool",
  "howrich",
  "ship",
  "hug",
  "kiss",
  "slap",
  "pat",
  "uyku",
  "alkış",
  "dance",
  "facepalm",
  "kedi",
  "köpek",
  "ayı",
  "panda",
  "meme",
  "joke",
  "fact",
  "avatar",
  "banner",
];

    if (!command && funCommands.includes(commandName)) {
      command = client.commands.get("fun");
    }

    if (!command) return;

    try {
      await command.execute(message, args, client);

      const logChannel = client.channels.cache.get(config.logs.command);
      if (logChannel) {
        logChannel.send(`⚙️ ${message.author.tag} → ${prefix}${commandName}`);
      }
    } catch (error) {
      console.error(error);
      message.reply("❌ Komut çalışırken hata oluştu.");
    }
  }
};