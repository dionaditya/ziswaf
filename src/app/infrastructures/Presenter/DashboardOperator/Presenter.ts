import { injectable } from "tsyringe";
import { DashboardOperatorRepositoryInterface } from "@/data/persistences/contracts/DashboardOperatorRepositoryInterface";
import { DashboardOperator } from '@/domain/entities/DashboardOperator';


@injectable()
export class DashboardOperatorPresenter  {
    private repository: DashboardOperatorRepositoryInterface

    constructor(repository: DashboardOperatorRepositoryInterface) {
      this.repository = repository
    }

    public getAllData(params: object): Promise<DashboardOperator> {
        return this.repository.getAllData(params)
    }

}
