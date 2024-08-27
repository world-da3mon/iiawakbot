require("dotenv").config();

// On importe des éléments du package discord.js
const { Client, IntentsBitField } = require("discord.js");
const mongoose = require("mongoose");
const eventHandler = require("./handlers/eventHandler");

// On crée la classe du bot (Client = Bot)
const client = new Client({
  intents: [
    //Intents = Permissions du bot
    IntentsBitField.Flags.Guilds, //Guild = Serveur
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(`✅ Connected to MongoDB.`);

    eventHandler(client);

    // On initialise le bot
    client.login(process.env.TOKEN);
  } catch (error) {
    console.log(`⚠️ ${error}`);
  }
})();
