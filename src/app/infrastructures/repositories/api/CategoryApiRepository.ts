import { CategoryRepositoryInterface } from '@/data/persistences/contracts/CategoryRepositoyInterface';
import { ApiServiceInterface, RequestType } from '@/data/infrastructures/ApiServiceInterface';
import { CategoryMapper } from '@/data/persistences/mappers/CategoryMapper';
import { Endpoints } from '../../misc/EndPoints';
import { Category, StatementCategory } from '@/domain/entities/Category';
import { CreateCategoryRequestInterface, UpdateCategoryRequestInterface } from '@/data/payload/contracts/CategoryContract';
import { CreateCategoryApiRequest, UpdateCategoryApiRequest } from '@/data/payload/api/CategoryApiRequest';

export class CategoryApiRepository implements CategoryRepositoryInterface {
    private service: ApiServiceInterface;
    private mapper: CategoryMapper;
    private endpoints: Endpoints;

    constructor(service: ApiServiceInterface, mapper: CategoryMapper, endpoints: Endpoints) {
        this.service = service;
        this.mapper = mapper;
        this.endpoints = endpoints;
    }

    public async getAll(params?: any): Promise<Category[]> {
        const resp = await this.service.invoke(
            RequestType.get, 
            this.endpoints.managerCategory(), 
            params, 
            {}
        );
        return this.mapper.convertCategoryListFromApi(resp);
    }

    public async getAllOperator(params?: any): Promise<Category[]> {
        const resp = await this.service.invoke(
            RequestType.get, 
            this.endpoints.getAllOperator(), 
            params, 
            {}
        );
        return this.mapper.convertCategoryOperatorListFromApi(resp);
    }


    public async getStatement(params?: any): Promise<StatementCategory[]> {
        const resp = await this.service.invoke(
            RequestType.get, 
            this.endpoints.managerStatementCategory(), 
            params, 
            {}
        );
        return this.mapper.convertStatementCategoriesFromApi(resp)
    }

    public async getById(id: string): Promise<Category> {
        const resp = await this.service.invoke(
            RequestType.get, 
            this.endpoints.managerCategory(id), 
            [], 
            {}
        );
        return this.mapper.convertCategoryFromApi(resp);
    }

    public async store(payload: CreateCategoryRequestInterface): Promise<boolean> {
        try {
            const resp = await this.service.invoke(
                RequestType.post, 
                this.endpoints.managerCategory(), 
                [], 
                payload as CreateCategoryApiRequest
            );

            return resp != null;
        } catch(e) {
            return false;
        }
    }

    public async update(id: string, payload: UpdateCategoryRequestInterface): Promise<boolean> {
        try {
            const resp = await this.service.invoke(
                RequestType.put, 
                this.endpoints.managerCategory(id), 
                [], 
                payload as UpdateCategoryApiRequest
            );
            return resp != null;
        } catch(e) {
            return false;
        }
    }
}