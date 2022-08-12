const { Client, GatewayIntentBits, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField } = require("discord.js");
const fs = require('node:fs');
require("dotenv").config();

const { loadEvents } = require("./handlers/loadEvents");
var dataObj = {};
var count = 0;

const client = new Client({
    allowedMentions: { parse: ["users", "roles"] },
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
    ]
});
client.on("ready", async () => {
    fs.readFile('./data.json', 'utf8', function readFileCallback(err, data) {
        if (err) {
            console.log(err);
        } else {
            dataObj = JSON.parse(data);
            if (dataObj.data[dataObj.data.length-1]) count = dataObj.data[dataObj.data.length-1].count+1;
        }
    });

    await loadEvents(client);
    console.log(`Running from ${client.user.tag}!`);
});

client.on("interactionCreate", async (interaction) => {
    if (interaction.isButton()) {
        switch (interaction.customId) {
            case "sender":
                const row = await new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId('sender')
                            .setLabel('Request Sent!')
                            .setStyle(ButtonStyle.Primary)
                            .setDisabled(true),
                    );
                await interaction.update({ components: [row] });
                if (interaction.guild.channels.cache.find(channel => channel.name == "RP-Session-"+interaction.message.id) == undefined) {
                    let user = {
                        user: interaction.user.id,
                        request: interaction.message.id,
                        count: count++
                    }
                    dataObj.data.push(user);
                    fs.writeFileSync('./data.json', JSON.stringify(dataObj));
                    await interaction.guild.channels.create({ 
                        name: 'RP-Session-'+user.request, 
                        reason: 'Session Requested',
                        permissionOverwrites: [
                            {
                                id: interaction.user.id, 
                                allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages], 
                                deny: [] 
                            },
                            {
                                id: interaction.guild.roles.everyone, 
                                allow: [], 
                                deny: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]
                            }
                        ]
                    });
                } else {
                    interaction.guild.channels.cache.find(channel => channel.name == "RP-Session-"+interaction.message.id).permissionOverwrites.edit(interaction.user.id, {
                        'SEND_MESSAGES': true,
                        'VIEW_CHANNEL': true,
                       })
                }
                break;
        }
    } else if (interaction.isChatInputCommand()) {
        const command = require(`./commands/${interaction.commandName}`);
        command.execute(interaction);
    }
});

client.login(process.env.BOT_TOKEN);