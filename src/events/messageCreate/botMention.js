module.exports = (client, message) => {
  if (message.author.bot) return;

  if (message.content.includes("<@1274811102785441852>")) {
    message.reply("https://tenor.com/view/cest-moi-its-me-gif-15503908");
  }
};
