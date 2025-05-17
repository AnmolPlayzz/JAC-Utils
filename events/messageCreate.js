const { Events } = require('discord.js');
const ig_blackList = process.env.IG_BLACKLIST;
const ig_asp = process.env.IG_ASP;
const ig_senior = process.env.IG_SENIOR;
const guildId = process.env.GUILD_ID

const { client } = require("../index.js")
let bannedUserIds = []

async function preFetch() {
    const targetGuild = await client.guilds.fetch(guildId)
    const members = (await targetGuild.members.fetch()).filter(e => {
        return e.roles.cache.some(role => role.id === ig_senior)
    }).map(e => e.id)

    bannedUserIds = members;
}

module.exports = {
    name: Events.MessageCreate,
    once: false,
    async execute(message) {
        const guild = message.guild;
        try {
            const guildMember = await guild.members.fetch(message.author.id)
            
            const igBlackRole = await guild.roles.fetch(ig_blackList)


            if (guildMember.roles.cache.some(role => role.id === igBlackRole.id)) {
                bannedUserIds.forEach(e => {
                    if(message.content.includes(e)) {
                        message.delete()
                    }
                })
                if(message.reference) {
                    const replyMsg = await message.channel.messages.fetch(message.reference.messageId);
                    const repId = replyMsg.author.id
                    if(bannedUserIds.some(e => e = repId)) {
                        message.delete()
                    }
                }  
            }
        } catch(e) {
        }
    },
    preFetch,
    bannedUserIds
};