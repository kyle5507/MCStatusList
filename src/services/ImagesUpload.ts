import axios from "axios"
import chalk from "chalk"
import { imageHash as callbackImageHash } from "image-hash"
import { ImgurClient } from "imgur"
import { singleton } from "tsyringe"
import { promisify } from "util"

import { Database, Logger } from "@services"


@singleton()
export class ImagesUpload {

    private validImageExtensions = ['.png', '.jpg', '.jpeg']

    private imgurClient: ImgurClient | null = process.env.IMGUR_CLIENT_ID ?
        new ImgurClient({
            clientId: process.env.IMGUR_CLIENT_ID
        }) : null

    constructor(
        private logger: Logger
    ) {
    }

    async addNewImageToImgur(base64: string, serverName: string) {

        if (!this.imgurClient) return
        
        try {
            const uploadResponse = await this.imgurClient.upload({
                image: base64,
                type: 'base64',
                name: `${serverName}.png`
            });

            if (!uploadResponse.success ) {
                this.logger.log(
                    `Error uploading image ${serverName} to imgur: ${uploadResponse.status} ${uploadResponse.data}`,
                    'error',
                    true
                )
                return
            }

            // log the success
            this.logger.log(
                `Image ${chalk.bold.green(serverName)} uploaded to imgur`,
                'info',
                true
                )
            return uploadResponse.data.link;
        } 
        catch (error: any) {
            this.logger.log(error?.toString(), 'error', true)
        }
    }
}