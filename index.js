const { Client, GatewayIntentBits, Collection } = require("discord.js");
const config = require("./config");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});

client.commands = new Collection();

// handlers
require("./handlers/commandHandler")(client);
require("./handlers/eventHandler")(client);

// message system
client.on("messageCreate", (message) => {
  if (!message.guild || message.author.bot) return;

  const prefix = config.prefix;

  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const cmd = args.shift().toLowerCase();

  const command = client.commands.get(cmd);
  if (!command) return;

  command.run(client, message, args);
});

client.login(config.token);
