require("dotenv").config();
const { Client, GatewayIntentBits, Partials, ActivityType } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ],
  partials: [Partials.Channel]
});

const prefix = "!";

// BOT READY + STATUS
client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);

  const statuses = [
    { name: "Servers", type: ActivityType.Watching },
    { name: "!help", type: ActivityType.Listening },
    { name: "moderating chats", type: ActivityType.Playing }
  ];

  let i = 0;

  setInterval(() => {
    const status = statuses[i];
    client.user.setActivity(status.name, { type: status.type });
    i = (i + 1) % statuses.length;
  }, 10000);
});

// COMMANDS
client.on("messageCreate", async (message) => {
  if (!message.guild || message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  // PING
  if (command === "ping") {
    message.reply(`🏓 Pong! Latency is ${Date.now() - message.createdTimestamp}ms`);
  }

  // HELP
  if (command === "help") {
    message.reply(
      `📌 Commands:
      !ping - Check bot latency
      !kick @user - Kick a user
      !ban @user - Ban a user
      !help - Show this help menu`
    );
  }

  // KICK
  if (command === "kick") {
    if (!message.member.permissions.has("KickMembers")) {
      return message.reply("❌ You don't have permission to kick members.");
    }

    const member = message.mentions.members.first();
    if (!member) return message.reply("❌ Mention a user to kick.");

    await member.kick();
    message.channel.send(`👢 Kicked ${member.user.tag}`);
  }

  // BAN
  if (command === "ban") {
    if (!message.member.permissions.has("BanMembers")) {
      return message.reply("❌ You don't have permission to ban members.");
    }

    const member = message.mentions.members.first();
    if (!member) return message.reply("❌ Mention a user to ban.");

    await member.ban();
    message.channel.send(`🔨 Banned ${member.user.tag}`);
  }
});

client.login(process.env.TOKEN);
