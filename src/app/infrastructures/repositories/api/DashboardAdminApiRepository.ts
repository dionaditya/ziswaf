import { DashboardMapper } from '@/data/persistences/mappers/DashboardAdminMapper'
import { DashboardAdminRepositoryInterface } from '@/data/persistences/contracts/DashboardAdminRepositoryInterface.ts'
import { DashboardAdmin, StatementReportData } from '@/domain/entities/DashboardAdmin'
import { Endpoints } from '@/app/infrastructures/misc/EndPoints'
import { ApiServiceInterface, RequestType } from '@/data/infrastructures/ApiServiceInterface'

export class DashboardAdminApiRepository implements DashboardAdminRepositoryInterface {
    private service: ApiServiceInterface
    private mapper: DashboardMapper
    private endpoints: Endpoints

    constructor(
        service: ApiServiceInterface,
        mapper: DashboardMapper,
        endpoints: Endpoints,
    ) {
        this.service = service
        this.mapper = mapper
        this.endpoints = endpoints
    }

    public async getAll(params: Map<string, string>): Promise<DashboardAdmin> {
        const response = await this.service.invoke(
            RequestType.get, 
            this.endpoints.getDashboardAdmin(), 
            params, 
            {}
        )
        return this.mapper.convertDashboardAdminFromApi(response)
    }

    public async getReportStatementDonation(params: Map<string, string>): Promise<StatementReportData> {
        const response = await this.service.invoke(
            RequestType.get, 
            this.endpoints.getReportDonation(), 
            params, 
            {}
        )
        return this.mapper.convertReportDonationApi(response)
    }
}
