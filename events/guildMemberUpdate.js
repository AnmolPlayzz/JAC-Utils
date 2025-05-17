
const { Events } = require('discord.js');
const { preFetch, bannedUserIds } = require('./messageCreate');
const ig_blackList = process.env.IG_BLACKLIST;
const ig_asp = process.env.IG_ASP;
const ig_senior = process.env.IG_SENIOR;
module.exports = {
    name: Events.GuildMemberUpdate,
    once: false,
    async execute(oldMember, newMember) {
        const guild = newMember.guild;
        try {
            const asp_Role = await guild.roles.fetch(ig_asp);
            if (newMember.roles.cache.some(role => role.id === ig_blackList)) {
                if(newMember.roles.cache.some(role => role.id === ig_asp)) {
                    newMember.roles.remove(asp_Role)
                }  
            }
            if (newMember.roles.cache.some(role => role.id === ig_senior)) {
                await preFetch()
                console.log(bannedUserIds)
            }
        } catch(e) {
            console.error(e)
        }
    },
};
