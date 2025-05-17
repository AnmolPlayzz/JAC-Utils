require("dotenv").config()
const { SlashCommandBuilder,InteractionContextType,EmbedBuilder } = require('discord.js');
const ig_blackList = process.env.IG_BLACKLIST
module.exports = {
	data: new SlashCommandBuilder()
		.setName('unblacklist')
		.setDescription('Remove a user from the IGDTUW blacklist!')
        .addUserOption(option =>
            option
                .setName('target')
                .setDescription('The member to ban')
                .setRequired(true))
        .setDefaultMemberPermissions("8")
        .setContexts(InteractionContextType.Guild),
	async execute(client, interaction) {
		const guild = interaction.guild;
        const user = await interaction.options.get("target")
        try {
            const member = await guild.members.fetch(user);
            const igBlackRole = await guild.roles.fetch(ig_blackList);
            member.roles.remove(igBlackRole)
            const embed = new EmbedBuilder()
                .setColor(0x57ff54)
	            .setTitle('Blacklist removed successful!')
                .setDescription(`${member.user} was removed from the IGDTUW Blacklist!`);
            interaction.reply({
                embeds: [embed]
            })
        } catch(e) {
            console.log(e)
        }
	},
};
