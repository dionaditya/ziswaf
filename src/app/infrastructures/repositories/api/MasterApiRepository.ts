import { MasterRepositoryInterface } from '@/data/persistences/contracts/MasterRepositoryInterface';
import { ApiServiceInterface, RequestType } from '@/data/infrastructures/ApiServiceInterface';
import { MasterMapper } from '@/data/persistences/mappers/MasterMapper';
import { Endpoints } from '../../misc/EndPoints';
import { City } from '@/domain/entities/City';
import { Province } from '@/domain/entities/Province';

export class MasterApiRepository implements MasterRepositoryInterface {
    private service: ApiServiceInterface;
    private mapper: MasterMapper;
    private endpoints: Endpoints;

    constructor(service: ApiServiceInterface, mapper: MasterMapper, endpoints: Endpoints) {
        this.service = service;
        this.mapper = mapper;
        this.endpoints = endpoints;
    }

    public async getCities(params: Map<string, string>): Promise<City[]> {
        throw new Error("Method not implemented.");
    }

    public async getProvinces(params: Map<string, string>): Promise<Province[]> {
        const resp = await this.service.invoke(
            RequestType.get, 
            this.endpoints.managerProvince(), 
            params, 
            {}
        );
        return this.mapper.convertProvinceListFromApi(resp);
    }

    public async getProvinceById(id: string): Promise<Province> {
        const resp = await this.service.invoke(
            RequestType.get, 
            this.endpoints.managerProvince(id), 
            [], 
            {}
        );
        return this.mapper.convertProvinceFromApi(resp);
    }
    
}