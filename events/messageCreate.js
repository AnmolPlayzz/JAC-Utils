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
                
                message.channel.send("https://media.discordapp.net/attachments/546763235051700314/883051087492423730/image0.gif?ex=682a2269&is=6828d0e9&hm=d7fd051e8cda3c4538ef348aab078fa55639a91b328c36c3f9516b7c65edf056&=&width=178&height=190")
            }
        } catch(e) {
        }
    },
    preFetch,
    bannedUserIds
};