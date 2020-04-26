import { DivisionRepositoryInterface } from '@/data/persistences/contracts/DivisionRepositoryInterface';
import { ApiServiceInterface, RequestType } from '@/data/infrastructures/ApiServiceInterface';
import { DivisionMapper } from '@/data/persistences/mappers/DivisionMapper';
import { Endpoints } from '../../misc/EndPoints';
import { CreateDivisionApiRequest, UpdateDivisionApiRequest } from '@/data/payload/api/DivisionApiRequest';
import { UpdateDivisionRequestInterface } from '@/data/payload/contracts/DivisionContract';
import { Division } from '@/domain/entities/Division';

export class DivisionApiRepository implements DivisionRepositoryInterface {
    private service: ApiServiceInterface;
    private mapper: DivisionMapper;
    private endpoints: Endpoints;

    constructor(service: ApiServiceInterface, mapper: DivisionMapper, endpoints: Endpoints) {
        this.service = service;
        this.mapper = mapper;
        this.endpoints = endpoints;
    }

    public async getAll(params: Map<string, string>): Promise<Division[]> {
        const resp = await this.service.invoke(
            RequestType.get, 
            this.endpoints.managerDivision(), 
            params, 
            {}
        );
        return this.mapper.convertDivisionListFromApi(resp);
    }

    public async getById(id: string): Promise<Division> {
        const resp = await this.service.invoke(
            RequestType.get, 
            this.endpoints.managerDivision(id), 
            [], 
            {}
        );
        return this.mapper.convertDivisionFromApi(resp);
    }
    
    public async store(payload: CreateDivisionApiRequest): Promise<boolean> {
        try {
            const resp = await this.service.invoke(
                RequestType.post, 
                this.endpoints.managerDivision(), 
                [], 
                payload as CreateDivisionApiRequest
            );

            return resp != null;
        } catch(e) {
            return false;
        }
    }

    public async update(id: string, payload: UpdateDivisionRequestInterface): Promise<boolean> {
        try {
            const resp = await this.service.invoke(
                RequestType.put, 
                this.endpoints.managerDivision(id), 
                [], 
                payload as UpdateDivisionApiRequest
            );
            return resp != null;
        } catch(e) {
            return false;
        }
    }
}