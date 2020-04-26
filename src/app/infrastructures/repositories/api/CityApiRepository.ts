import ApiService from "@/app/infrastructures/services/ApiServices";
import { Endpoints } from "@/app/infrastructures/misc/EndPoints";
import { CityRepositoryInterface } from '@/data/persistences/contracts/CityRepositoryInterface'
import { CityMapper } from '@/data/persistences/mappers/CityMapper';
import { City } from '@/domain/entities/City';


export class CityApiRepository implements CityRepositoryInterface {

    private service: ApiService
    private mapper: CityMapper
    private endpoints: Endpoints

    constructor(
        service: ApiService,
        mapper: CityMapper,
        endpoints: Endpoints,
    ) {
        this.service = service
        this.mapper = mapper
        this.endpoints = endpoints
    }

    public async loadData(params?: any): Promise<City[]> {
        const response = await this.service.invoke(
            "get",
            this.endpoints.getCityList(),
            params,
            {}
        )
        return this.mapper.convertCityFromApi(response)

    }
}
