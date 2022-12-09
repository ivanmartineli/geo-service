import { inject, injectable } from 'tsyringe'
import { Request, Response } from 'express'
import { tokens } from '@di/tokens'
import { IGeocodingService } from '@domain/geocoding/types/IGeocodingService'

@injectable()
export class GetGeocodingController {
    constructor(

        @inject(tokens.GeocodingService)
        private geoService: IGeocodingService

    ) { }

    async getAddress(request: Request, response: Response) {
        try {

            const address = request.query.address as string

            const result = await this.geoService.getGeo(address)
            if (result.status === 400) {
                return response.status(400).send(result)
            }

            return response.status(200).send(result)

        } catch (err) {
            console.log(err)
            return response.sendStatus(500)
        }
    }
}
