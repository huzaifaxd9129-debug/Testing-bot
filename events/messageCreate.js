const automod = require("../systems/automod");

module.exports = {
  name: "messageCreate",
  execute(message, client) {

    if (!message.guild || message.author.bot) return;

    automod(message, client);
  }
};
