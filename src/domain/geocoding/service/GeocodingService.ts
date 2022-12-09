import { injectable, inject } from 'tsyringe'
import { IGeocodingService } from '../types/IGeocodingService'
import { tokens } from '@di/tokens'
import { IGeoapifyRepository } from '../types/IGeoapifyRepository'
import {
    AddressDto, DistanceBetweenTwoCoordinatesDto,
    DistanceBetweenAddressDto, GeocodingDto, ResponseDto
} from '../types/dtos/IGeoResponseDTO';

@injectable()
export class GeocodingService implements IGeocodingService {

    constructor(

        @inject(tokens.GeoapifyRepository)
        private geoapifyRepository: IGeoapifyRepository

    ) { }

    /**
     * Método responsável por buscar as localizações dos endereços envidados 
     * @param addresses endereços
     * @returns Lista de endereços.
     */
    async getGeo(addresses: string): Promise<ResponseDto> {

        const addressesDtoList: AddressDto[] = []
        const distanceAndressList: DistanceBetweenAddressDto[] = []

        const formatedAddressesList = addresses.split(";")

        if (formatedAddressesList.length < 3) {
            const responseDto: ResponseDto = {
                status: 400,
                message: 'Quantity of addresses less than 3'
            }

            return responseDto;
        }

        // busca os endereços de acordo com a lista 
        for (var i = 0; i < formatedAddressesList.length; i++) {

            const address = formatedAddressesList[i];

            // Busca na api geoapify o endereço 
            const geoapifyList = await this.geoapifyRepository.getGeoapify(address);

            const addressDto: AddressDto = {
                address: geoapifyList.query.text,
                lat: geoapifyList.results[0].lat,
                lon: geoapifyList.results[0].lon
            }
            addressesDtoList.push(addressDto)
        }

        for (var i = 0; i < addressesDtoList.length; i++) {
            for (var j = 0; j < addressesDtoList.length; j++) {
                if (addressesDtoList[j].address > addressesDtoList[i].address && addressesDtoList[i].address !== addressesDtoList[j].address) {

                    const coordinates: DistanceBetweenTwoCoordinatesDto = {
                        lat1: addressesDtoList[j].lat,
                        lon1: addressesDtoList[j].lon,
                        lat2: addressesDtoList[i].lat,
                        lon2: addressesDtoList[i].lon
                    }

                    // distância calculada
                    const distanceInKm = this.getDistance(coordinates)

                    const distanceAddress: DistanceBetweenAddressDto = {
                        address: formatedAddressesList[i] + ' + ' + formatedAddressesList[j],
                        distanceInKm: parseFloat(distanceInKm)

                    }
                    distanceAndressList.push(distanceAddress)
                }
            }
        }

        const resultGeo: GeocodingDto = {
            geolocation: addressesDtoList,
            distanceBetweenAddresses: distanceAndressList
        }

        const responseDto: ResponseDto = {
            result: resultGeo
        }

        return responseDto;

    }

    /**
     * Método responsável por calulcar as coordenadas entre dois endereços
     * @param coordinates - coordenadas
     * @returns distância entre as coordenadas em KM
     */
    getDistance(coordinates: DistanceBetweenTwoCoordinatesDto) {

        let lat1: number = coordinates.lat1
        let lon1: number = coordinates.lon1
        let lat2: number = coordinates.lat2
        let lon2: number = coordinates.lon2

        var radlat1 = Math.PI * lat1 / 180
        var radlat2 = Math.PI * lat2 / 180
        var theta = lon1 - lon2
        var radtheta = Math.PI * theta / 180
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist)
        dist = dist * 180 / Math.PI
        dist = dist * 60 * 1.1515

        dist = dist * 1.609344

        return dist.toFixed(2)

    }

}
