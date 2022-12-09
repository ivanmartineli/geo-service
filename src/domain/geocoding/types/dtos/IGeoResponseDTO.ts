
export interface AddressDto {
    address: string
    lat: number,
    lon: number,
}

export interface DistanceBetweenAddressDto {
    address: string
    distanceInKm: number
}

export interface DistanceBetweenTwoCoordinatesDto {
    lat1: number,
    lon1: number,
    lat2: number
    lon2: number
}

export interface GeocodingDto {
    geolocation: AddressDto[]
    distanceBetweenAddresses: DistanceBetweenAddressDto[]
}

export interface ResponseDto {
    result?: GeocodingDto
    status?: 400
    message?: string
}