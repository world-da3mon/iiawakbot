const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = async (client) => {
  try {
    const channel = await client.channels.cache.get("1275895773288075386");
    if (!channel) {
      console.log("This channel doesn't exist");
      return;
    }

    const channelMessages = [];

    const messages = await channel.messages.fetch().then((messages) => {
      messages.forEach((message) => channelMessages.push(message));
    });
    
    if (channelMessages.length !== 0) return;

    const row = new ActionRowBuilder();

    const button = new ButtonBuilder()
      .setCustomId("helpButton")
      .setLabel("Get help")
      .setStyle(ButtonStyle.Success);

    row.components.push(button);

    await channel.send({
      content: "Click the button below to send a help request.",
      components: [row],
    });
  } catch (error) {
    console.log(`⚠️ ${error}`);
  }
};
