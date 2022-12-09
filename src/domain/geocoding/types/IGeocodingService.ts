import { IStatusREsponseDTO } from "./dtos/IGeoResponseDTO";

export interface IGeocodingService {
    getGeo(addres:string): Promise<IStatusREsponseDTO>
}