import { Entity, PrimaryKey, Property, EntityRepositoryType } from "@mikro-orm/core"
import { EntityRepository } from "@mikro-orm/sqlite"

import { CustomBaseEntity } from "./BaseEntity"

// ===========================================
// ================= Entity ==================
// ===========================================

@Entity({ customRepository: () => McServerRepository })
export class McServer extends CustomBaseEntity {

    [EntityRepositoryType]?: McServerRepository

    @PrimaryKey({ autoincrement: true })
    id: string

    @Property({ nullable: false, type: 'string' })
    ip: string

    @Property({ nullable: false, type: 'string' })
    name: string
    
    @Property()
    guildId: string | null

    @Property()
    channelId: string

    @Property({ nullable: true})
    channel2Id: string | null

    @Property()
    messageId: string | undefined

    @Property({ nullable: true})
    message2Id: string | undefined | null

    @Property({ nullable: true})
    website: string | undefined | null

    @Property({ nullable: true})
    imgUrl: string | undefined | null

    @Property()
    deleted: boolean = false

    @Property()
    lastInteract: Date = new Date()
}

// ===========================================
// =========== Custom Repository =============
// ===========================================

export class McServerRepository extends EntityRepository<McServer> { 

    async updateLastInteract(guildId?: string): Promise<void> {

        const guild = await this.findOne({ id: guildId })
        
        if (guild) {
            guild.lastInteract = new Date()
            await this.flush()
        }
    }

    async getActiveMCServers() {
        return this.find({ deleted: false })
    }
}