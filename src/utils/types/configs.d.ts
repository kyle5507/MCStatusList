type GeneralConfigType = {

    name: string
    description: string
    defaultLocale: import('@i18n').Locales
    ownerId: string
    timezone: string
    
    automaticDeferring: boolean

    links: {
		invite: string
		supportServer: string
		gitRemoteRepo: string
	}

    devs: string[]
}

type DatabaseConfigType = {
    
    path: `${string}/` 

    backup: {
        enabled: boolean
        path: `${string}/`
    }
}

type LogsConfigType = {

    debug: boolean

    interaction: {
        file: boolean
        console: boolean
        channel: string | null

        exclude: InteractionsConstants[]
    }

    simpleCommand: {
        file: boolean
        console: boolean
        channel: string | null
    }

    newUser: {
        file: boolean
        console: boolean
        channel: string | null
    }

    guild: {
        file: boolean
        console: boolean
        channel: string | null
    }

    error: {
        file: boolean
        console: boolean
        channel: string | null
    }
}

type StatsConfigType = {

    interaction: {
        
        exclude: InteractionsConstants[]
    }
}

type APIConfigType = {

    enabled: boolean
    port: number
}

type WebsocketConfigType = {

    enabled: boolean
}