const { removePremium } = require("../../utils/premium");

module.exports = {
  name: "removepremium",

  run(client, message, args) {

    if (message.author.id !== "1363540480662704248")
      return message.reply("Owner only");

    const user = message.mentions.users.first();
    if (!user) return message.reply("Mention user");

    removePremium(user.id);

    message.reply(`Removed premium from ${user.tag}`);
  }
};
