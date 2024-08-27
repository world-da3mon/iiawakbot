const {
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require("discord.js");

module.exports = async (client, interaction) => {
  if (!interaction.isButton()) return;

  switch (interaction.message.id) {
    case "1275778685869228135":
      await interaction.deferReply({ ephemeral: true });
      const role = interaction.guild.roles.cache.get(interaction.customId);

      if (!role) {
        interaction.editReply({
          content: "This role doesn't exist, please warn the development team.",
        });
        return;
      }

      const hasRole = interaction.member.roles.cache.has(role.id);

      if (hasRole) {
        await interaction.member.roles.remove(role);
        await interaction.editReply(`The role ${role} has been removed.`);
        return;
      }

      await interaction.member.roles.add(role);
      await interaction.editReply(`The role ${role} has been added.`);
    case "1276137141973287015":
      try {
        const helpModal = new ModalBuilder()
          .setCustomId("helpModal")
          .setTitle("Help Request");

        const helpField = new TextInputBuilder()
          .setCustomId("helpField")
          .setLabel("Enter your request below.")
          .setStyle(TextInputStyle.Paragraph);

        const actionRow = new ActionRowBuilder().addComponents(helpField);

        helpModal.addComponents(actionRow);

        await interaction.showModal(helpModal);
        return;
      } catch (error) {
        console.error(`⚠️ ${error}`);
      }
    default:
      return;
  }
};
