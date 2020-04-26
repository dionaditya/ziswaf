import { injectable } from "tsyringe";
import { DashboardAdminRepositoryInterface} from "@/data/persistences/contracts/DashboardAdminRepositoryInterface.ts";
import { DashboardAdmin, StatementReportData } from '@/domain/entities/DashboardAdmin';


@injectable()
export class DashboardAdminPresenter  {
    private repository: DashboardAdminRepositoryInterface

    constructor(repository: DashboardAdminRepositoryInterface) {
      this.repository = repository
    }

    public getAll(params: Object): Promise<DashboardAdmin> {
        return this.repository.getAll(params)
    }

    public getReportStatementDonation(params: Object): Promise<StatementReportData>{
      return this.repository.getReportStatementDonation(params)
    }

}
