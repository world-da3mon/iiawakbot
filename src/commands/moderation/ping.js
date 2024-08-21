module.exports = {
    name: "ping",
    description: "The bot's ping",
    devOnly: true,

    callback: async (client, interaction) => {
        await interaction.deferReply();

        const reply = await interaction.fetchReply();

        const ping = reply.createdTimestamp - interaction.createdTimestamp;

        interaction.editReply(
            `${client.user.displayName}'s ping is ${ping}ms.`
        );
    }
};