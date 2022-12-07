import { IStatusREsponseDTO } from "./dtos/IStatusResponseDTO";

export interface IGeocodingService {
    getGeo(addres:string): Promise<IStatusREsponseDTO>
}