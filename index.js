const { Client, Intents } = require("discord.js");
const fs = require('node:fs');
require("dotenv").config();

const { loadEvents } = require("./handlers/loadEvents");

const client = new Client({
    allowedMentions: { parse: ["users", "roles"] },
    intents: 8
});

function onInteraction(client,interaction) {
    const command = require(`./commands/${interaction.commandName}`);
    command.execute(client, interaction);
}

client.on("ready", () => {
    loadEvents(client);
    console.log(`Running from ${client.user.tag}!`);
});

client.on("interactionCreate", (interaction) => {
    onInteraction(client,interaction);
});

client.login(process.env.BOT_TOKEN);