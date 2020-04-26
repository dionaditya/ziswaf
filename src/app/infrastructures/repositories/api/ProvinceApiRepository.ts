import ApiService from "@/app/infrastructures/services/ApiServices";
import { Endpoints } from "@/app/infrastructures/misc/EndPoints";
import { ProvinceRepositoryInterface } from '@/data/persistences/contracts/ProvinceRepositoryInterface'
import { ProvinceMapper } from '@/data/persistences/mappers/ProvinceMapper'
import { Province } from '@/domain/entities/Province';

export class ProvinceApiRepository implements ProvinceRepositoryInterface {
    private service: ApiService
    private mapper: ProvinceMapper
    private endpoints: Endpoints

    constructor(
        service: ApiService,
        mapper: ProvinceMapper,
        endpoints: Endpoints,
    ) {
        this.service = service
        this.mapper = mapper
        this.endpoints = endpoints
    }

    public async loadData(params?: any): Promise<Province[]> {
        const response = await this.service.invoke(
            "get",
            this.endpoints.getProvinceList(),
            params
        )
        return this.mapper.convertProvinceListFromApi(response)

    }

    public async LoadDetailData(provinceId: number): Promise<Province> {

        const response = await this.service.invoke(
            "get",
            this.endpoints.getProvinceDetail(provinceId),
            {}
        )
        return this.mapper.convertProvinceDetailFromApi(response)
    }

}
