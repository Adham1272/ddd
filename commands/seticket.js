const { MessageEmbed } = require("discord.js");
const { MessageButton, MessageActionRow } = require("gcommands");

module.exports = {
    name: "setticket",
    description: "Set ticket :O",
    slash: true,
    expectedArgs: [
        {
            name: "openedcategory",
            type: 7,
            description: "Category for opened tickets",
            required: true
        },
        {
            name: "closedcategory",
            type: 7,
            description: "Category for closed tickets",
            required: true
        },
        {
            name: "archivedcategory",
            type: 7,
            description: "Category for archived tickets",
            required: true
        },
        {
            name: "claimedcategory",
            type: 7,
            description: "Category for claimed tickets",
            required: true
        },
        {
            name: "moderatorrole",
            type: 8,
            description: "Moderator role",
            required: true
        }
    ],
    userRequiredPermissions: "ADMINISTRATOR",
    run: async({client, guild, respond}, arrayArgs) => {
        let openedCategory = guild.channels.cache.get(arrayArgs[0])
        let closedCategory = guild.channels.cache.get(arrayArgs[1])
        let archivedCategory = guild.channels.cache.get(arrayArgs[2])
        let claimedCategory = guild.channels.cache.get(arrayArgs[3])

        if(openedCategory.type != "category" || closedCategory.type != "category" || archivedCategory.type != "category" || claimedCategory.type != "category") return respond({
            content: "You need to set categories not channels!",
            ephemeral: true
        })

        client.db.set(`guild_${guild.id}`, {
            openedCategory: arrayArgs[0],
            closedCategory: arrayArgs[1],
            archivedCategory: arrayArgs[2],
            claimedCategory: arrayArgs[3],
            moderatorRole: arrayArgs[4]
        })

      respond({
        content: "Set!",
        inlineReply: false
      })
  }
};