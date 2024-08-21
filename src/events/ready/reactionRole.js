const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = async (client) => {
    const roles = [
        {
            id: '1275768710128205834',
            label: 'Role1'
        },
        {
            id: '1275768751706341387',
            label: 'Role2'
        },
        {
            id: '1275768778747154545',
            label: 'Role3'
        },
    ]

    try {
        const channel = await client.channels.cache.get('1275770794206691382');
        if (!channel) return;

        const channelMessages = [];

        const messages = await channel.messages.fetch().then(messages => {
            messages.forEach(message => channelMessages.push(message))
        });
        
        if (channelMessages.length !== 0) return;        

        const row = new ActionRowBuilder();

        roles.forEach((role) => {
            row.components.push(
                new ButtonBuilder().setCustomId(role.id).setLabel(role.label).setStyle(ButtonStyle.Primary)
            );
        });

        await channel.send({
            content: "Choose your role(s) here:",
            components: [row],
        });
    } catch (error) {
        console.log(`⚠️ ${error}`);
    }
};