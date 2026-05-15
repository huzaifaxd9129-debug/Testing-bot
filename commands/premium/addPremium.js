const { addPremium } = require("../../utils/premium");

module.exports = {
  name: "addpremium",

  run(client, message, args) {

    if (message.author.id !== "1363540480662704248")
      return message.reply("Owner only");

    const user = message.mentions.users.first();
    if (!user) return message.reply("Mention user");

    addPremium(user.id);

    message.reply(`💎 Added premium to ${user.tag}`);
  }
};
