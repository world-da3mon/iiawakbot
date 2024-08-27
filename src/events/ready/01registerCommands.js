const { guildId } = require("../../../config.json");
const getApplicationCommands = require("../../utils/getApplicationCommands");
const getLocalCommands = require("../../utils/getLocalCommands");
const areCommandsDifferent = require("../../utils/areCommandsDifferent");

module.exports = async (client) => {
  try {
    const localCommands = getLocalCommands();
    const applicationCommands = await getApplicationCommands(client, guildId);

    for (const localCommand of localCommands) {
      const { name, description, options } = localCommand;

      const existingCommand = await applicationCommands.cache.find(
        (cmd) => cmd.name === localCommand.name
      );

      if (existingCommand) {
        if (localCommand.deleted) {
          await applicationCommands.delete(existingCommand.id);
          console.log(`🗑️ Deleted command: ${name}`);
          continue;
        }

        if (areCommandsDifferent(existingCommand, localCommand)) {
          await applicationCommands.edit(existingCommand.id, {
            description,
            options,
          });

          console.log(`📝 A command was edited: ${name}`);
        }
      } else {
        if (localCommand.deleted) {
          console.log(`⏭️ Skipping registering of deleted command: ${name}`);
          continue;
        }

        await applicationCommands.create({
          name,
          description,
          options,
        });

        console.log(`♻️ New command registered: ${name}`);
      }
    }
  } catch (error) {
    console.log(`⚠️ ${error}`);
  }
};
