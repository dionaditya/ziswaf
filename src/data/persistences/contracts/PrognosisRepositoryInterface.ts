import { CreatePrognosisRequestInterface } from '@/data/payload/contracts/PrognosisContract';
import { Prognosis, PrognosisItem } from '@/domain/entities/Prognosis';

export interface PrognosisRepositoryInterface {
    getAll(params: object): Promise<Prognosis> 
    store(payload: CreatePrognosisRequestInterface): Promise<PrognosisItem>
}