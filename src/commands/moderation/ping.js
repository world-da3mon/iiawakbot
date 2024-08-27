module.exports = {
  name: "ping",
  description: "The bot's ping",
  devOnly: true,

  callback: async (client, interaction) => {
    const ping = client.ws.ping;

    interaction.reply(`<@${client.user.id}>'s ping is ${ping}ms.`);
  },
};
