const fs = require("fs");

module.exports = (client) => {
  const folders = fs.readdirSync("./commands");

  for (const folder of folders) {
    const files = fs.readdirSync(`./commands/${folder}`);

    for (const file of files) {
      const cmd = require(`../commands/${folder}/${file}`);

      if (cmd.name) {
        client.commands.set(cmd.name, cmd);
        console.log("Loaded:", cmd.name);
      }
    }
  }
};
