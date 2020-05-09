import ApiService from "@/app/infrastructures/services/ApiServices";
import { Endpoints } from "@/app/infrastructures/misc/EndPoints";
import { SchoolMapper } from "@/data/persistences/mappers/SchoolMapper";
import { SchoolRepositoryInterface } from "@/data/persistences/contracts/SchoolRepositoryInterface";
import { createSchooInterface, updateSchooInterface } from '@/data/payload/contracts/SchoolContract';
import { SchoolApiRequest } from '@/data/payload/api/SchoolApiRequest';
import { School } from '@/domain/entities/School';


export class SchoolApiRepository implements SchoolRepositoryInterface {

    private service: ApiService
    private mapper: SchoolMapper
    private endpoints: Endpoints

    constructor(
        service: ApiService,
        mapper: SchoolMapper,
        endpoints: Endpoints,
    ) {
        this.service = service
        this.mapper = mapper
        this.endpoints = endpoints
    }
    
    public async loadData(params?: any): Promise<any | null> {
        const response = await this.service.invoke(
            "get",
            this.endpoints.getListSchool(),
            params
        )
        return {
            ...response,
            data: {
                ...response.data,
                data:  this.mapper.convertSchoolListFromApi(response)
            }
        }
    }


    public async loadDataDetail(id: number): Promise<School | null> {
        const response = await this.service.invoke(
            "get",
            this.endpoints.getDetailSchool(id),
            id
        )
        return this.mapper.convertSchoolFromApi(response)
    }

    public async postNewSchoolData(payload: createSchooInterface): Promise<any> {
        try {
            const response = await this.service.invoke(
                "post",
                this.endpoints.postNewSchoolData(),
                {},
                payload as SchoolApiRequest
            )
            return ['success', response]
        } catch (e) {
            return ['error', e.response]
        }
    }

    public async updateSchooldData(payload: any, id: number): Promise<any> {
        try {
            const response = await this.service.invoke(
                "put",
                this.endpoints.updateSchoolData(id),
                {},
                payload.toJson()
            )
            return ['success', response]
        } catch (e) {
            return ['error', e.response]
        }
    }

    public async deleteSchoolData(id: number): Promise<any> {
        try {
            const response = await this.service.invoke(
                "delete",
                this.endpoints.deleteSchoolData(id),
                id
            )
            return ['success', response]
        } catch (error) {
            return ['error', error.response]
        }
    }
}
