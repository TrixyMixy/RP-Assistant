const { SlashCommandBuilder } = require('@discordjs/builders');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const config = require("../config.json");

module.exports = {
    data: new SlashCommandBuilder().setName('request').setDescription('Request a roleplay session.'),
    execute: async (interaction) => {
        //if (interaction.channelId!=config["rp_channel"]) return;
        //console.log(interaction);
        const row = await new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('sender')
                    .setLabel('Request Session')
                    .setStyle(ButtonStyle.Primary),
            );
        var message = await interaction.reply({
            embeds: [{
                color: 0x0099ff,
                title: `Request from ${interaction.user.username}#${interaction.user.discriminator}`,
            }],
            components: [row]
        });

    }
};
