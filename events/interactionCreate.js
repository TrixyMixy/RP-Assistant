const { GuildMember, MessageEmbed } = require("discord.js");
const { rp_channel } = require('./config.json')
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('request')
    .setDescription('Create a request to roleplay.'),
    execute: async (commandInteraction) => {
        await commandInteraction.editReply({
            embeds: [
                new MessageEmbed({
                    title: `Request from ${commandInteraction.author}`
                })
            ]
        })
    }
} 