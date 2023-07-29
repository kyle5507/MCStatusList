import { Category } from "@discordx/utilities"
import { ApplicationCommandOptionType, CommandInteraction } from "discord.js"
import { Client, Guild } from "discordx"
import { injectable } from "tsyringe"

import { Discord, Slash, SlashOption } from "@decorators"
import { Guard, GuildOnly, UserPermissions } from "@guards"
import { Database, ImagesUpload } from "@services"
import { McServer } from "@entities"
import { simpleSuccessEmbed, statusEmbed, getMcStatus } from "@utils/functions"

@Discord()
@injectable()
@Category('Admin')
export default class AddMcServer {
	constructor(
		private db: Database,
		private imgur: ImagesUpload
	) {}
	@Slash({ name: 'addmcserver', description: 'Add a MC Server' })
	@Guard(GuildOnly)
	@Guard(
		UserPermissions(['Administrator'])
	)
	async addmcserver(
		@SlashOption({ 
			name: 'name',
			type: ApplicationCommandOptionType.String,
			required: true
		}) name: string,
		@SlashOption({ 
			name: 'ip',
			type: ApplicationCommandOptionType.String,
			required: true
		}) ip: string,
		@SlashOption({
			name: 'channel',
			type: ApplicationCommandOptionType.Channel,
			required: true
		}) channel: any,
		@SlashOption({
			name: 'secondary_channel',
			type: ApplicationCommandOptionType.Channel,
			required: false
		}) channel2: any,
		@SlashOption({
			name: 'website',
			type: ApplicationCommandOptionType.String,
			required: false
		}) website: any,
		interaction: CommandInteraction,
		client: Client,
		{ localize }: InteractionData
	) {
		var guild = await this.db.get(Guild).findOne({id: interaction.guildId})
		var currentMcServerCount = await this.db.get(McServer).count({guildId: interaction.guildId})
		if (!guild.isPremium) {
			
		}
			
		var mcServerData = new McServer();
		mcServerData.guildId = interaction.guildId;
		mcServerData.ip = ip;
		mcServerData.name = name;
		mcServerData.channelId = channel.id;
		var status = await getMcStatus(ip);
		mcServerData.imgUrl = await this.imgur.addNewImageToImgur(status.favicon.split(",")[1], name);
		if (website) {
			mcServerData.website = website;
		}

		if (channel2) {
			mcServerData.channel2Id = channel2.id;
			let message = await channel2.send(await statusEmbed(mcServerData, status));
			mcServerData.message2Id = message?.id;
		}
		
		let message = await channel.send(await statusEmbed(mcServerData, status));
		mcServerData.messageId = message?.id;
		
		this.db.get(McServer).persistAndFlush(mcServerData)
		simpleSuccessEmbed(interaction, `Added server ${ip} successfully.`)	
	}
}