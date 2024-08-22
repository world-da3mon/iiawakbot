const { ActivityType } = require("discord.js");

module.exports = (client) => {
  client.user.setPresence({
    activities: [
      {
        name: "En cours de programmation...",
        type: ActivityType.Custom,
      },
    ],
    status: "online",
  });
};
