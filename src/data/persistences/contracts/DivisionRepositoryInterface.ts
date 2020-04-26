import { Division } from '@/domain/entities/Division';
import { CreateDivisionApiRequest } from '@/data/payload/api/DivisionApiRequest';
import { UpdateDivisionRequestInterface } from '@/data/payload/contracts/DivisionContract';

export interface DivisionRepositoryInterface {
    getAll(params: Map<string, string>): Promise<Division[]>
    getById(id: string): Promise<Division>
    store(payload: CreateDivisionApiRequest): Promise<boolean>
    update(id: string, payload: UpdateDivisionRequestInterface): Promise<boolean>
}