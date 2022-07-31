const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('node:fs');
const config = require("../config.json");

module.exports = {
    data: new SlashCommandBuilder().setName('clearchannels').setDescription('Clears all RP channels'), // DEV ONLY
    execute: async (interaction) => {
        const list = interaction.guild.channels.cache.filter((c) => c.name.indexOf("rp-session")>-1);
        list.forEach((c) => interaction.guild.channels.delete(c.id));
        let dataObj = {data:[]};
        fs.writeFileSync('./data.json', JSON.stringify(dataObj));
        await interaction.reply("Cleared RP Channels!");
    }
};