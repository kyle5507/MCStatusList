import { ActivityType, Message, TextChannel } from "discord.js"
import { Client } from "discordx"
import { injectable } from "tsyringe"

import { generalConfig, logsConfig } from "@configs"
import { Discord, Once, Schedule } from "@decorators"
import { Data, McServer } from "@entities"
import { Database, Logger, Scheduler, Store } from "@services"
import { getMcStatus, resolveDependency, sleep, statusEmbed, syncAllGuilds } from "@utils/functions"

@Discord()
@injectable()
export default class ReadyEvent {

    constructor(
        private db: Database,
        private logger: Logger,
        private scheduler: Scheduler,
        private store: Store
    ) {}

    private activityIndex = 0

    @Once('ready')
    async readyHandler([client]: [Client]) {

        // make sure all guilds are cached
        await client.guilds.fetch()

        // synchronize applications commands with Discord
        await client.initApplicationCommands({
            global: {
                disable: {
                    delete: false
                }
            }
        })

        // change activity
        await this.changeActivity()

        // update last startup time in the database
        await this.db.get(Data).set('lastStartup', Date.now())

        // start scheduled jobs
        this.scheduler.startAllJobs()

        // log startup
        await this.logger.logStartingConsole()

        // synchronize guilds between discord and the database
        await syncAllGuilds(client)

        // the bot is fully ready
        this.store.update('ready', (e) => ({ ...e, bot: true }))
    }

    @Schedule('*/15 * * * * *') // each 15 seconds
    async changeActivity() {
        var servers = await this.db.get(McServer).getActiveMCServers();
        const ActivityTypeEnumString = ["PLAYING", "STREAMING", "LISTENING", "WATCHING", "CUSTOM", "COMPETING"] // DO NOT CHANGE THE ORDER

        const client = await resolveDependency(Client)
            
        client.user?.setActivity(`over ${servers.length} Minecraft servers`, {
            type: ActivityTypeEnumString.indexOf("WATCHING")
        })
    }

    @Schedule('*/5 * * * *') // each 5 minutes
    async refreshServers() {
        var servers = await this.db.get(McServer).getActiveMCServers();
        const client = await resolveDependency(Client);
        var sleepTime = 5 * 60 / servers.length;
        this.logger.log(`Refreshing ${servers.length} servers.`)
        for (var server of servers) {
            var status = await getMcStatus(server.ip)
            
            var guild = await client.guilds.fetch(server.guildId ?? "")
            if (!guild) {
                this.logger.log(`removing ${server.ip} because the guild is not found ${server.guildId}`)
                server.deleted = true;
                await this.db.get(McServer).persistAndFlush(server)
                continue;
            };
            this.logger.log(`Refreshing ${guild.name} (${server.ip}). Sleeping for ${sleepTime} seconds`)
            for(let channelId in [server.channelId, server.channel2Id]){

            }
            var channel = await guild.channels.fetch(server.channelId ?? "")
            if (!channel) {
                this.logger.log(`removing ${server.ip} because the channel is not found ${server.channelId}`)
                server.deleted = true;
                await this.db.get(McServer).persistAndFlush(server)
                continue;
            };
            var message = await (channel as TextChannel).messages.fetch(server.messageId ?? "")
            if (!message) {
                message = await (channel as TextChannel).send(await statusEmbed(server, status));
                server.messageId = message.id;
                await this.db.get(McServer).persistAndFlush(server)
                continue;
            };
            var statusStr = status.online ? `${server.name}: ${status.players.online}/${status.players.max}` : `${server.name}: OFFLINE`
            if (server.channel2Id){
                var channel2 = await guild.channels.fetch(server.channel2Id ?? "")
                if (channel2) {
                    if (channel2.isVoiceBased())
                        channel2.setName(statusStr)
                    else
                        (channel2 as TextChannel).setTopic(statusStr)
                    var message2 = await (channel2 as TextChannel).messages.fetch(server.message2Id ?? "")
                    if (!message2) {
                        message = await (channel2 as TextChannel).send(await statusEmbed(server, status));
                        server.messageId = message.id;
                        await this.db.get(McServer).persistAndFlush(server)
                        continue;
                    };
                message2.edit(await statusEmbed(server, status))
                }
            }

            if (channel.isVoiceBased())
                channel.setName(statusStr)
            else
                (channel as TextChannel).setTopic(statusStr)
            
            message.edit(await statusEmbed(server, status))
            server.lastInteract = new Date();
		    this.db.get(McServer).persistAndFlush(server)
            await sleep(sleepTime);
        }
    }
}