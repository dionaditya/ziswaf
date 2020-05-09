import { injectable } from "tsyringe";
import { RecordRepositoryInterface } from '@/data/persistences/contracts/RecordRepositoryInterface';
import { Record } from '@/domain/entities/Record';



@injectable()
export class RecordPresenter {
    private repository: RecordRepositoryInterface

    constructor(repository: RecordRepositoryInterface) {
      this.repository = repository
    }

    public getRecord(id: number): Promise<Record | null> {
        return this.repository.getRecord(id)
    }

}