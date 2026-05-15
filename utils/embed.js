const { EmbedBuilder } = require("discord.js");

module.exports = (message, title, desc) => {
  return new EmbedBuilder()
    .setColor("#5865F2")
    .setTitle(title)
    .setDescription(desc)
    .setFooter({
      text: `Action by ${message.author.tag}`
    })
    .setTimestamp();
};
