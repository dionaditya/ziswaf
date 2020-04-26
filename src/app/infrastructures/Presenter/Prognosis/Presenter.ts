import { injectable } from 'tsyringe';
import { PrognosisRepositoryInterface } from '@/data/persistences/contracts/PrognosisRepositoryInterface';
import { Prognosis, PrognosisItem } from '@/domain/entities/Prognosis';
import { CreatePrognosisApiRequest } from '@/data/payload/api/PrognosisApiRequest';

@injectable()
export class PrognosisPresenter {
    private repository: PrognosisRepositoryInterface

    constructor(repository: PrognosisRepositoryInterface) {
        this.repository = repository
    }

    public getAll(params: object): Promise<Prognosis> {
        return this.repository.getAll(params)
    }

    public store(payload: CreatePrognosisApiRequest): Promise<PrognosisItem> {
        return this.repository.store(payload);
    }
}