const { Events } = require('discord.js');
const { preFetch, bannedUserIds } = require('./messageCreate');

module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
		await preFetch()
		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};
