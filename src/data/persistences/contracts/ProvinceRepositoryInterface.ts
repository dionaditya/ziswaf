import { Province } from '@/domain/entities/Province';


export interface ProvinceRepositoryInterface {
    loadData(load: Map<string, string>, search?: string): Promise<Province[]>,
    LoadDetailData(provinceId: number): Promise<Province>
}
