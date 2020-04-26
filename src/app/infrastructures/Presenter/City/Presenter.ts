import { injectable } from "tsyringe";
import { CityRepositoryInterface} from "@/data/persistences/contracts/CityRepositoryInterface";
import { City } from '@/domain/entities/City';


@injectable()
export class CityPresenter  {
    private repository: CityRepositoryInterface

    constructor(repository: CityRepositoryInterface) {
      this.repository = repository
    }

    public loadData(params?: any): Promise<City[]> {
        return this.repository.loadData(params)
    }

}