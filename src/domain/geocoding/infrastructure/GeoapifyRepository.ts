import { inject, injectable } from 'tsyringe'
import { IGeoapifyRepository } from '../types/IGeoapifyRepository'
import { tokens } from '@di/tokens'
import { Config } from '@config/Config'

const superagent = require('superagent');

@injectable()
export class GeoapifyRepository implements IGeoapifyRepository {

    constructor(

        @inject(tokens.Config)
        private config: Config,

    ) { }

    async getGeoapify(address: string): Promise<any> {

        const apiUrl = this.config.get().urlGeoApi.url

        console.log('API url: ' + apiUrl)

        try {

            const res = await superagent
                .get('https://api.geoapify.com/v1/geocode/search')
                .query({
                    text: address,
                    format: 'json',
                    apiKey: 'd52c84abe7b543df8add5bcbd45b8cfa'
                })
            return res.body

        } catch (error) {
            console.log(
                `Failed to get geocoding in geoapify API: 
            Error: ${JSON.stringify(error)}`)

        }

    }

}