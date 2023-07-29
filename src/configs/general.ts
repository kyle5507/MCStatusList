export const generalConfig: GeneralConfigType = {

	name: 'tscord', // the name of your bot
	description: '', // the description of your bot
	defaultLocale: 'en', // default language of the bot, must be a valid locale
	ownerId: process.env['BOT_OWNER_ID'] || '',
	timezone: 'Europe/Paris', // default TimeZone to well format and localize dates (logs, stats, etc)

	automaticDeferring: true, // enable or not the automatic deferring of the replies of the bot on the command interactions

	// useful links
	links: {
		invite: 'https://discord.com/api/oauth2/authorize?client_id=1118565456601698445&permissions=8&scope=bot',
		supportServer: 'https://discord.gg/f27sAKzhZc',
		gitRemoteRepo: 'https://github.com/barthofu/tscord',
	},
	
	devs: [], // discord IDs of the devs that are working on the bot (you don't have to put the owner's id here)

	// define the bot activities (phrases under its name). Types can be: PLAYING, LISTENING, WATCHING, STREAMING
}

// global colors
export const colorsConfig = {

	primary: '#38761d',
	failure: '#e61c1c',
}
