const { Client, Message } = require("discord.js");
const Level = require("../../models/Level");
const calculateLevelXp = require("../../utils/calculateLevelXp");

function getRandomXp(min, max) {
  min = Math.ceil(min);
  max = Math.ceil(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 *
 * @param {Client} client
 * @param {Message} message
 */

module.exports = async (client, message) => {
  if (
    !message.inGuild() ||
    message.author.bot ||
    message.channel.id === "1277670853563387935" ||
    message.channel.id === "1274839419781779557"
  )
    return;

  const xpToGive = getRandomXp(5, 15);

  const query = {
    userId: message.author.id,
    guildId: message.guild.id,
  };

  try {
    const level = await Level.findOne(query);

    if (level) {
      level.xp += xpToGive;

      if (level.xp > calculateLevelXp(level.level)) {
        level.xp = 0;
        level.level += 1;
        const channel = client.channels.cache.get("1277663249772576809");

        channel.send(
          `${message.member} tu es monté niveau **${level.level}** !`
        );
      }
      await level.save().catch((e) => {
        console.log(`⚠️ ${error}`);
        return;
      });
    } else {
      const newLevel = new Level({
        userId: message.author.id,
        guildId: message.guild.id,
        xp: xpToGive,
      });

      await newLevel.save();
    }
  } catch (error) {
    console.log(`⚠️ ${error}`);
  }
};
