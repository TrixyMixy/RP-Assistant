const getEvent = (event) => require(`../events/${event}`);
const Discord = require("discord.js");

function loadEvents(client) {
    client.on("interactionCreate", (m) => getEvent("interactionCreate")(m));
}

module.exports = {
    loadEvents,
};