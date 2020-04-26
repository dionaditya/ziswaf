import { injectable } from "tsyringe";
import { VillageRepositoryInterface} from "@/data/persistences/contracts/VillageRepositoryInterface";
import { Village } from '@/domain/entities/Village';


@injectable()
export class VillagePresenter  {
    private repository: VillageRepositoryInterface

    constructor(repository: VillageRepositoryInterface) {
      this.repository = repository
    }

    public loadData(params?: any): Promise<Village[]> {
        return this.repository.loadData(params)
    }

}