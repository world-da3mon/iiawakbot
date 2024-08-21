const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'spam',
    description: 'Spamme un membre',
    options: [
        {
            name: 'membre',
            description: 'Le membre à spam',
            type: ApplicationCommandOptionType.Mentionable,
            required: true,
        }
    ],
    devOnly: true,

    callback: (client, interaction) => {
        const channel = client.channels.cache.get(`${interaction.channelId}`);
        
        interaction.reply(`<@${interaction.options.get('membre').user.id}>`);
        
        for (let i = 0; i < 9; i++) {
            channel.send(`<@${interaction.options.get('membre').user.id}>`);
        }
    }
};