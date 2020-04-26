import ApiService from "@/app/infrastructures/services/ApiServices";
import { Endpoints } from "@/app/infrastructures/misc/EndPoints";
import { DistrictRepositoryInterface } from '@/data/persistences/contracts/DistrictRepositoryInterface'
import { DistrictMapper } from '@/data/persistences/mappers/DistrictMapper';
import { District } from '@/domain/entities/District';


export class DistrictApiRepository implements DistrictRepositoryInterface {

    private service: ApiService
    private mapper: DistrictMapper
    private endpoints: Endpoints

    constructor(
        service: ApiService,
        mapper: DistrictMapper,
        endpoints: Endpoints,
    ) {
        this.service = service
        this.mapper = mapper
        this.endpoints = endpoints
    }

    public async loadData(params: any): Promise<District[]> {
        const response = await this.service.invoke(
            "get",
            this.endpoints.getDistrictList(),
            params,
            {}
        )
        return this.mapper.convertDistrictFromApi(response)

    }
}
