const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
config = require("../config.json");

module.exports = {
    data: new SlashCommandBuilder().setName('request').setDescription('Request a roleplay session.'),
    execute: async (client, interaction)=>{
        //if (interaction.channelId!=config["rp_channel"]) return;
        console.log(interaction);
        await interaction.reply({
            embeds: [
                new MessageEmbed({
                    title: `Request from ${interaction.author}`
                })
            ]    
        })
    }
};
