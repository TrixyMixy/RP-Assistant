const { Client, Intents, Message, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const fs = require('node:fs');
require("dotenv").config();

const { loadEvents } = require("./handlers/loadEvents");

const client = new Client({
    allowedMentions: { parse: ["users", "roles"] },
    intents: 8
});
client.on("ready", async () => {
    await loadEvents(client);
    console.log(`Running from ${client.user.tag}!`);
});

client.on("interactionCreate", async (interaction) => {
    if (interaction.isButton()){
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
                break;
        }
    } else if (interaction.isChatInputCommand()) {
        const command = require(`./commands/${interaction.commandName}`);
        command.execute(interaction);
    }
});

client.login(process.env.BOT_TOKEN);