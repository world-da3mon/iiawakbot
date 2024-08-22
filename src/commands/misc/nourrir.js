const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
  name: "nourrir",
  description: "Donne un cookie au membre sélectionné",
  options: [
    {
      name: "membre",
      description: "Le membre à nourrir",
      type: ApplicationCommandOptionType.Mentionable,
      required: true,
    },
  ],
  //deleted: true,
  //devOnly: true,

  callback: (client, interaction) => {
    interaction.reply(
      `<@${interaction.user.id}> donne un cookie à <@${
        interaction.options.get("membre").user.id
      }> 🍪.`
    );
  },
};
