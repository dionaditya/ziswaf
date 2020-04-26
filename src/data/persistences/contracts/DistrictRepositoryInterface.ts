import { District } from '@/domain/entities/District';

export interface DistrictRepositoryInterface {
    loadData(params: any): Promise<District[]>,
}
