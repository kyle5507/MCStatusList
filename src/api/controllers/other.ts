import { McServer } from "@entities"
import { Database } from "@services"
import { Controller, Get } from "@tsed/common"

import { BaseController } from "@utils/classes"
import { resolveDependencies } from "@utils/functions"

@Controller('/')
export class OtherController extends BaseController {

    private db: Database

    constructor() {
        super()

        resolveDependencies([Database]).then(([db]) => {
            this.db = db
        })
    }

    @Get('/mcServers')
    async mcServers() {
        // get all mc servers from DB. in json
        let mcServers = await this.db.get(McServer).findAll()
        return JSON.stringify(mcServers)
    }
    
}