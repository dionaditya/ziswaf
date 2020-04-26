import ApiService from "@/app/infrastructures/services/ApiServices";
import { Endpoints } from "@/app/infrastructures/misc/EndPoints";
import { VillageRepositoryInterface } from '@/data/persistences/contracts/VillageRepositoryInterface'
import { VillageMapper } from '@/data/persistences/mappers/VillageMapper';
import { Village } from '@/domain/entities/Village';


export class VillageApiRepository implements VillageRepositoryInterface {

    private service: ApiService
    private mapper: VillageMapper
    private endpoints: Endpoints

    constructor(
        service: ApiService,
        mapper: VillageMapper,
        endpoints: Endpoints,
    ) {
        this.service = service
        this.mapper = mapper
        this.endpoints = endpoints
    }

    public async loadData(params?: any): Promise<Village[]> {
        const response = await this.service.invoke(
            "get",
            this.endpoints.getVillageList(),
            params,
            {}
        )
        return this.mapper.convertVillageFromApi(response)
    }
}
