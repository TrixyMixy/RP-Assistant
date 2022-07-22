const { Client, Intents } = require("discord.js");
require("dotenv").config();

const { loadEvents } = require("./handlers/loadEvents");

const client = new Client({
    allowedMentions: { parse: ["users", "roles"] },
    intents: 8
});
client.config = require("./config.json");

client.on("ready", () => {
    loadEvents(client);
    console.log(`Running from ${client.user.tag}!`);
});

client.login(process.env.BOT_TOKEN);