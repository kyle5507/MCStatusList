import { CommandInteraction, EmbedBuilder } from "discord.js"

import { getColor, replyToInteraction } from "@utils/functions"
import { McServer } from "@entities"
import { Status } from "../packages/mc-status"

/**
 * Send a simple success embed
 * @param interaction - discord interaction
 * @param message - message to log
 */
export const simpleSuccessEmbed = (interaction: CommandInteraction, message: string) => {

    const embed = new EmbedBuilder()
        .setColor(0x57f287) // GREEN // see: https://github.com/discordjs/discord.js/blob/main/packages/discord.js/src/util/Colors.js
        .setTitle(`✅ ${message}`)

    replyToInteraction(interaction, { embeds: [embed], ephermal: true })
}

/**
 * Send a simple error embed
 * @param interaction - discord interaction
 * @param message - message to log
 */
export const simpleErrorEmbed = (interaction: CommandInteraction, message: string) => {

    const embed = new EmbedBuilder()
        .setColor(0xed4245) // RED // see: https://github.com/discordjs/discord.js/blob/main/packages/discord.js/src/util/Colors.js
        .setTitle(`❌ ${message}`)

    replyToInteraction(interaction, { embeds: [embed]})
}

export const serverEmbed = (mcServers: McServer[]) => {
    var embeds = [];
    for (let server in mcServers) {

        let embed = new EmbedBuilder()
        //     .setTitle(server?.guildId + ' Server')
        //     .setColor(getColor('primary'))
        //     .setDescription(server?.ip ?? 'No IP found')
        //     .setFields(
        //         {	name: 'Message 1', value: `https://discord.com/channels/${mcServerData?.guildId}/${mcServerData?.channelId}/${mcServerData?.messageId}`})
        //     .setTimestamp()
        //     .setFooter({
        //         text: 'McServer List',
        //     });
        // if (server.channel2Id)
        // {
        //     embed.addFields(
        //         {	name: 'Message 2', value: `https://discord.com/channels/${mcServerData?.guildId}/${mcServerData?.channel2Id}/${mcServerData?.message2Id}`})
        // }
        embeds.push(embed)
    }
    return embeds;
}

export const statusEmbed = async (mcServerData: McServer, status: Status) => {
    if (status.online) {
        var playerListStr ;
        if(status.players.online > 0) {
            playerListStr = ''
            for (var player of status?.players?.sample)
            {
                playerListStr += `• ${player.name}\n`
            }
        }
        var embed = new EmbedBuilder()
        .setTitle(mcServerData.name)
        .setDescription(`Players Online: ${status.players.online} / ${status.players.max}\n${playerListStr ?? ''}\n\n\n`)
        .setColor(getColor('primary'))
        //.setThumbnail(status?.favicon ?? '')
        .setFields(
            {	name: 'IP', value: mcServerData.ip})
        .setTimestamp()
    } else {
        var embed = new EmbedBuilder()
        .setTitle(mcServerData.name)
        .setDescription('Server is offline..')
        .setColor(getColor('failure'))
        .setFields(
            {	name: 'IP', value: mcServerData.ip})
        .setTimestamp()
    }
    if (mcServerData.website){
        embed.setURL(mcServerData.website)
    }
    if (mcServerData.imgUrl){
        embed.setThumbnail(mcServerData.imgUrl)
    }
    return {embeds: [embed]};
}

export const replyServerEmbed = (interaction: CommandInteraction, mcServerData: any) => {
    replyToInteraction(interaction, {embeds: [serverEmbed(mcServerData)]} )
}