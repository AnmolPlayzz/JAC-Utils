require("dotenv").config()
const { SlashCommandBuilder,InteractionContextType,EmbedBuilder } = require('discord.js');
const ig_blackList = process.env.IG_BLACKLIST
module.exports = {
	data: new SlashCommandBuilder()
		.setName('list')
		.setDescription('View the users under the IGDTUW Blacklist')
        .setContexts(InteractionContextType.Guild),
	async execute(client, interaction) {
		const guild = interaction.guild;
        const members = (await guild.members.fetch()).filter(e => {
                return e.roles.cache.some(role => role.id === ig_blackList)
            }).map(e => `- <@!${e.id}> (**ID:** ${e.id})`).join("\n");
        try {
            const embed = new EmbedBuilder()
                .setColor(0xff001e)
	            .setTitle('The IGDTUW Blacklist')
                .setDescription(members);
            interaction.reply({
                embeds: [embed]
            })
        } catch(e) {
            console.log(e)
        }
	},
};
