import { injectable } from "tsyringe";
import { DistrictRepositoryInterface} from "@/data/persistences/contracts/DistrictRepositoryInterface";
import { District } from '@/domain/entities/District';


@injectable()
export class DistrictPresenter  {
    private repository: DistrictRepositoryInterface

    constructor(repository: DistrictRepositoryInterface) {
      this.repository = repository
    }

    public loadData(params: any): Promise<District[]> {
        return this.repository.loadData(params)
    }

}