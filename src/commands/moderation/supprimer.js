const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
  name: "supprimer",
  description: "Supprime des messages",
  options: [
    {
      name: "nombre",
      description: "Le nombre de messages à supprimer (max. 100)",
      type: ApplicationCommandOptionType.Integer,
      required: true,
    },
  ],
  devOnly: true,

  callback: (client, interaction) => {
    const channel = client.channels.cache.get(`${interaction.channelId}`);

    const messages = channel.messages
      .fetch({ limit: interaction.options.get("nombre").value })
      .then((messages) => {
        messages.forEach((message) => message.delete());
      });

    interaction.reply({
      content: `${interaction.options.get("nombre").value} messages supprimés`,
      ephemeral: true,
    });
  },
};
