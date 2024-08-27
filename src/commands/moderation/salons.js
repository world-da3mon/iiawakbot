const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
  name: "salons",
  description: "Modifier un salon",
  options: [
    {
      name: "salon",
      description: "Le salon à modifier.",
      type: ApplicationCommandOptionType.Channel,
      required: true,
    },
    {
      name: "paramètre",
      description: "Le paramètre à modifier",
      type: ApplicationCommandOptionType.String,
      required: true,
      choices: [
        {
          name: "nom",
          value: "name",
        },
        {
          name: "sujet",
          value: "topic",
        },
        {
          name: "nsfw",
          value: "nsfw",
        },
        {
          name: "slowdown",
          value: "rateLimitPerUser",
        },
      ],
    },
    {
      name: "valeur",
      description: "La valeur à donner à ce paramètre",
      type:
        ApplicationCommandOptionType.String ||
        ApplicationCommandOptionType.Integer ||
        ApplicationCommandOptionType.Boolean,
      required: true,
    },
  ],
  devOnly: true,

  callback: async (client, interaction) => {
    const channelId = interaction.options.get("salon").value;
    const channel = client.channels.cache.get(channelId);

    if (!channel) {
      interaction.reply("Ce salon n'existe pas, veuillez réessayer.");
      return;
    }

    const parameter = interaction.options.get("paramètre").value;
    const value = interaction.options.get("valeur").value;
    try {
      switch (parameter) {
        case "name":
          await channel.edit({ name: value });
          break;
        case "topic":

          await channel.edit({ topic: value });
          break;
        case "nsfw":

          await channel.edit({ nsfw: value });
          break;
        case "rateLimitPerUser":

          await channel.edit({ rateLimitPerUser: value });
          break;
      }
      interaction.reply(
        `${interaction.user.displayName} a modifié le salon ${channel}`
      );
    } catch (error) {
      console.log(`⚠️ ${error}`);
    }
  },
};
