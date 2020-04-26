import { City } from '@/domain/entities/City';


export interface CityRepositoryInterface {
    loadData(params?: any): Promise<City[]>,
}
