const getEvent = (event) => require(`../events/${event}`);
const Discord = require("discord.js");

function loadEvents(client) {
    client.on("messageCreate", (m) => getEvent("messageCreate")(m));
}

module.exports = {
    loadEvents,
};