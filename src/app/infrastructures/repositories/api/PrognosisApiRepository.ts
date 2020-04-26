import { PrognosisRepositoryInterface } from '@/data/persistences/contracts/PrognosisRepositoryInterface';
import { CreatePrognosisRequestInterface } from '@/data/payload/contracts/PrognosisContract';
import { ApiServiceInterface, RequestType } from '@/data/infrastructures/ApiServiceInterface';
import { PrognosisMapper } from '@/data/persistences/mappers/PrognosisMapper';
import { Endpoints } from '../../misc/EndPoints';
import { CreatePrognosisApiRequest } from '@/data/payload/api/PrognosisApiRequest';
import { Prognosis, PrognosisItem } from '@/domain/entities/Prognosis';

export class PrognosisApiRepository implements PrognosisRepositoryInterface {
    private service: ApiServiceInterface;
    private mapper: PrognosisMapper;
    private endpoints: Endpoints;

    constructor(service: ApiServiceInterface, mapper: PrognosisMapper, endpoints: Endpoints) {
        this.service = service;
        this.mapper = mapper;
        this.endpoints = endpoints;
    }
    
    public async store(payload: CreatePrognosisRequestInterface): Promise<PrognosisItem> {
        try {
            const resp = await this.service.invoke(
                "post", 
                this.endpoints.managerPrognosis(), 
                [], 
                payload as CreatePrognosisApiRequest
            );

            return resp
        } catch(e) {
            return e;
        }
    }

    public async getAll(params: Map<string, string>): Promise<any> {
        const resp = await this.service.invoke(
            RequestType.get, 
            this.endpoints.managerPrognosis(), 
            params, 
            {}
        );

        return this.mapper.convertPrognosisFromApi(resp);
    }
    
}