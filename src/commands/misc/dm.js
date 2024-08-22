const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
  name: "dm",
  description: "DM la personne de votre choix",
  options: [
    {
      name: "membre",
      description: "Le membre à DM",
      type: ApplicationCommandOptionType.Mentionable,
      required: true,
    },
    {
      name: "texte",
      description: "Le texte à envoyer",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  devOnly: true,

  callback: (client, interaction) => {
    user = interaction.options.get("membre").user;
    user.send(interaction.options.get("texte").value);

    interaction.reply({ content: "Votre DM a été envoyé.", ephemeral: true });
  },
};
