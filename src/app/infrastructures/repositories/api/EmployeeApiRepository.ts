import ApiService from "@/app/infrastructures/services/ApiServices";
import { Endpoints } from "@/app/infrastructures/misc/EndPoints";
import { EmployeeMapper } from "@/data/persistences/mappers/EmployeeMapper";
import { EmployeeRepositoryInterface } from "@/data/persistences/contracts/EmployeeRepositoryInterface";
import { createEmployeeInterface, updateEmployeeInterface } from '@/data/payload/contracts/EmployeeContract';
import { Employee } from '@/domain/entities/Employee';
export class EmployeeApiRepository implements EmployeeRepositoryInterface {
    private service: ApiService
    private mapper: EmployeeMapper
    private endpoints: Endpoints

    constructor(
        service: ApiService,
        mapper: EmployeeMapper,
        endpoints: Endpoints,
    ) {
        this.service = service
        this.mapper = mapper
        this.endpoints = endpoints
    }

    public async loadData(params: any): Promise<any | null> {
        const response = await this.service.invoke(
            "get",
            this.endpoints.getEmployeeList(),
            params,
            {}
        )
        return {
            ...response,
            data: {
                ...response.data,
                data: this.mapper.convertEmployeesFromApi(response)
            }
        }
    }

    public async loadDataDetail(id: number): Promise<any | null> {
        const response = await this.service.invoke(
            "get",
            this.endpoints.getDetailEmployee(id),
            id
        )
        return {
            ...response,
            data: {
                ...response.data,
                data: this.mapper.convertEmployeeFromApi(response)
            }
        }
    }

    public async postNewEmployeeData(payload: createEmployeeInterface): Promise<any> {
        try {
            const response = await this.service.invokePostWithFormData(
                "post",
                this.endpoints.postNewEmployeeData(),
                {},
                payload
            )
            return response 
        } catch (e) {
            return e
        }

    }

    public async updateEmployeedData(payload: updateEmployeeInterface, id: number): Promise<any> {
        try {
            const response = await this.service.invokePostWithFormData(
                "put",
                this.endpoints.updateEmployeeData(id),
                {},
                payload
            )
            return response 
        } catch (e) {
            return e.response
        }
    }

    public async deleteEmployeeData(id: number): Promise<any> {
            const response = await this.service.invoke(
                "delete",
                this.endpoints.deleteEmployeeData(id),
                id
            )
            return response
    }
}
