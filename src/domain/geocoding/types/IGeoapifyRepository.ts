
export interface IGeoapifyRepository {
    getGeoapify(address: string): Promise<any>
}