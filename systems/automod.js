module.exports = (message, client) => {

  const content = message.content.toLowerCase();

  // anti-link
  if (content.includes("discord.gg") || content.includes("http")) {
    if (!message.member.permissions.has("Administrator")) {
      message.delete().catch(() => {});
      message.channel.send("🚫 Links not allowed");
    }
  }

  // anti spam
  if (!client.spam) client.spam = {};
  const user = message.author.id;

  if (!client.spam[user]) client.spam[user] = [];

  client.spam[user].push(Date.now());

  client.spam[user] = client.spam[user].filter(
    t => Date.now() - t < 5000
  );

  if (client.spam[user].length > 5) {
    message.delete().catch(() => {});
    message.channel.send("🚫 Stop spamming");
  }
};
