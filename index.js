const Discord = require("discord.js");
require("dotenv").config();

const { loadEvents } = require("./handlers/loadEvents");

const client = new Discord.Client();
client.config = require("./config.json")

client.on("ready", () => {
    console.log(`Running from ${client.user.tag}!`);
});

client.login(process.env.BOT_TOKEN);