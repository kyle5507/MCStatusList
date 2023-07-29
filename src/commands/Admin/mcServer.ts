import { Client } from 'discordx'
import { Category } from '@discordx/utilities'
import { CommandInteraction, Embed, EmbedBuilder, TextChannel, embedLength } from 'discord.js'

import { Discord, Slash } from '@decorators'
import { Guard, GuildOnly, UserPermissions } from '@guards'
import { Database } from '@services'
import { McServer } from '@entities'
import { replyServerEmbed, serverEmbed } from '@utils/functions'
import { injectable } from 'tsyringe'

@Discord()
@injectable()
@Category('Admin')
export default class McServerCommand {
	constructor(
		private db: Database
	){}
	@Slash({
		name: 'mcserver',
		description: 'View all MC servers connected to the Discord Server'
	})
	@Guard(GuildOnly)
	@Guard(
		UserPermissions(['Administrator'])
	)
	async mcserver(
		interaction: CommandInteraction,
		client: Client,
		{ localize }: InteractionData
	) {
		var mcServerData = await this.db.get(McServer).find({guildId: interaction.guildId});
		replyServerEmbed(interaction, mcServerData);
	}
}