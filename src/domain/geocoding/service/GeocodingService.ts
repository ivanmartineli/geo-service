import { injectable, inject } from 'tsyringe'
import { IGeocodingService } from '../types/IGeocodingService'
import { IStatusREsponseDTO } from '../types/dtos/IStatusResponseDTO'
import { tokens } from '@di/tokens'
import { IGeoapifyRepository } from '../types/IGeoapifyRepository'


@injectable()
export class GeocodingService implements IGeocodingService {

    constructor(

        @inject(tokens.GeoapifyRepository)
        private geoapifyRepository: IGeoapifyRepository

    ) { }

    async getGeo(addres: string): Promise<IStatusREsponseDTO> {

        const geo = await this.geoapifyRepository.getGeoapify();

        console.log('RETURN SERVICE ---> ' +JSON.stringify(geo))

        var result = addres.split(";")

        let km = 50

        const listArr = []

        for (var i = 0; i < result.length; i++) {
            for (var j = 0; j < result.length; j++) {
                // if (result[i] !== result[j] && result[j] > result[i]) {

                if (result[j] > result[i] && result[i] !== result[j]) {


                    // console.log(result[i] + ' COM ' + result[j])

                    km += 50

                    listArr.push(result[i] + ' + ' + result[j] + ' = ' + km)



                }
            }
        }

        console.log('LISTA FINAL ' + JSON.stringify(listArr))

        if (result.length >= 3) {

            for (var i = 0; i < result.length; i++) {
            }
        }

        const m: IStatusREsponseDTO = {
            status: 400,
            message: 'NAO TEM 3 ENDEREÇOS'
        }

        return m

    }

}
