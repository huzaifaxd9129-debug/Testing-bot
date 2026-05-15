const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection
} = require("discord.js");

const fs = require("fs");
const config = require("./config");

// ========== CLIENT ==========
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates
  ],
  partials: [
    Partials.Channel,
    Partials.Message,
    Partials.User,
    Partials.GuildMember
  ]
});

// ========== HANDLERS ==========
client.commands = new Collection();

// Load command handler
require("./handlers/commandHandler")(client);

// Load event handler
require("./handlers/eventHandler")(client);

// ========== READY ==========
client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
  console.log("All systems online 🚀");
});

// ========== MESSAGE COMMAND SYSTEM ==========
client.on("messageCreate", async (message) => {
  if (!message.guild) return;
  if (message.author.bot) return;

  const prefix = config.prefix;

  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const cmdName = args.shift().toLowerCase();

  const command =
    client.commands.get(cmdName);

  if (!command) return;

  try {
    command.run(client, message, args);
  } catch (err) {
    console.log(err);
    message.reply("❌ Error executing command");
  }
});

// ========== LOGIN ==========
client.login(config.token);
