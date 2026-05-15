const fs = require("fs");
const path = require("path");

module.exports = (client) => {
  const folders = fs.readdirSync("./commands");

  for (const folder of folders) {
    const files = fs
      .readdirSync(`./commands/${folder}`)
      .filter(f => f.endsWith(".js"));

    for (const file of files) {
      const command = require(`../commands/${folder}/${file}`);

      if (command.name) {
        client.commands.set(command.name, command);
        console.log(`Loaded: ${command.name}`);
      }
    }
  }
};
