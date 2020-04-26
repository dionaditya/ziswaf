import { injectable } from "tsyringe";
import { ProvinceRepositoryInterface} from "@/data/persistences/contracts/ProvinceRepositoryInterface";
import { Province } from '@/domain/entities/Province';



@injectable()
export class ProvincePresenter  {
    private repository: ProvinceRepositoryInterface

    constructor(repository: ProvinceRepositoryInterface) {
      this.repository = repository
    }

    public loadData(params?: any): Promise<Province[]> {
        return this.repository.loadData(params)
    }

    public loadDetailData(provinceId: number): Promise<Province> {
        return this.repository.LoadDetailData(provinceId)
    }

}