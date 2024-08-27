module.exports = (client) => {
  const channel = client.channels.cache.get("1277699440492413031");

  setInterval(async () => {
    if (channel) {
      const ping = client.ws.ping;

      channel.send(`<@${client.user.id}>'s ping is **${ping}ms**.`);
    } else {
      console.log("Error, specified channel doesn't exist.");
    }
  }, 3600000);
};
