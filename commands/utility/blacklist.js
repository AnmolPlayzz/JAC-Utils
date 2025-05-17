require("dotenv").config()
const { SlashCommandBuilder,InteractionContextType,EmbedBuilder } = require('discord.js');
const ig_blackList = process.env.IG_BLACKLIST
module.exports = {
	data: new SlashCommandBuilder()
		.setName('blacklist')
		.setDescription('Add a user to the IGDTUW blacklist!')
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
            member.roles.add(igBlackRole)
            const embed = new EmbedBuilder()
                .setColor(0xc90000)
	            .setTitle('Blacklist successful!')
                .setDescription(`${member.user} was added to the IGDTUW Blacklist!\n` + 
                    "This user won't be able to interact with anyone from IGDTUW or access the respective channels."
                );
            interaction.reply({
                embeds: [embed]
            })
        } catch(e) {
            console.log(e)
        }
	},
};
