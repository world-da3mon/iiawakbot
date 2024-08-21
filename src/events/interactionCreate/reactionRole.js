module.exports = async (client, interaction) => {
    if (!interaction.isButton()) return;
    
    if (interaction.message.id !== '1275778685869228135') return;
    
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
    await interaction.editReply(`The role ${role} has been added.`)
};