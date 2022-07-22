const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
    data: new SlashCommandBuilder().setName('request').setDescription('Request a roleplay session.'),
    execute: ()=>{}
};
