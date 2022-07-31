const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('node:fs');

function loadEvents(client) {
    const commands = [];
    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const command = require(`../commands/${file}`);
        commands.push(command.data.toJSON());
    }

    const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);
    (async () => {
        try {
            await rest.put(
                Routes.applicationCommands("999712176203894825"),
                { body: commands },
            );
        } catch (error) {
            console.error(error);
        }
    })();
}

module.exports = {
    loadEvents,
};