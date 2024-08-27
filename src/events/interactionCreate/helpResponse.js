module.exports = async (client, interaction) => {
  if (!interaction.isModalSubmit()) return;

  if (interaction.customId === "helpModal") {
    const channel = client.channels.cache.get("1276110731732844616");
    const helpRequest = interaction.fields.getTextInputValue("helpField");

    channel.send(
      `Help request sent by <@${interaction.user.id}>: **${helpRequest}**`
    );

    await interaction.reply({
      content: "Your request was successfully sent.",
      ephemeral: true,
    });
  }
};
