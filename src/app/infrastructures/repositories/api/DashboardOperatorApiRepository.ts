import { DashboardOperatorMapper } from '@/data/persistences/mappers/DashboardOperatorMapper'
import { DashboardOperatorRepositoryInterface } from '@/data/persistences/contracts/DashboardOperatorRepositoryInterface'
import { DashboardOperator } from '@/domain/entities/DashboardOperator'
import { Endpoints } from '@/app/infrastructures/misc/EndPoints'
import { ApiServiceInterface, RequestType } from '@/data/infrastructures/ApiServiceInterface'

export class DashboardOperatorApiRepository implements DashboardOperatorRepositoryInterface {
    private service: ApiServiceInterface
    private mapper: DashboardOperatorMapper
    private endpoints: Endpoints

    constructor(
        service: ApiServiceInterface,
        mapper: DashboardOperatorMapper,
        endpoints: Endpoints,
    ) {
        this.service = service
        this.mapper = mapper
        this.endpoints = endpoints
    }

    public async getAllData(params: Object): Promise<DashboardOperator> {
        const response = await this.service.invoke(
            RequestType.get, 
            this.endpoints.getDashboardOperator(), 
            params, 
            {}
        )
        return this.mapper.convertDashboardOperatorFromApi(response)
    }
}
