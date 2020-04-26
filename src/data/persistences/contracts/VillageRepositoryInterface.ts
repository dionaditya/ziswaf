import { Village } from '@/domain/entities/Village';

export interface VillageRepositoryInterface {
    loadData(params?: any): Promise<Village[]>,
}
