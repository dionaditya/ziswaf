import { City } from '@/domain/entities/City';
import { Province } from '@/domain/entities/Province';

export interface MasterRepositoryInterface {
    getCities(params: Map<string, string>): Promise<City[]>
    getProvinces(params: Map<string, string>): Promise<Province[]>
    getProvinceById(id: String): Promise<Province>
}