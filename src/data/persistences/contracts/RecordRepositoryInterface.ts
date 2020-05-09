import { Record } from '@/domain/entities/Record';

export interface RecordRepositoryInterface {
    getRecord(id: number): Promise<Record | null>,
}