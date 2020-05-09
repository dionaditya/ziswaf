import ApiService from "@/app/infrastructures/services/ApiServices";
import { Endpoints } from "@/app/infrastructures/misc/EndPoints";
import { StudentMapper } from "@/data/persistences/mappers/StudentMapper";
import { StudentRepositoryInterface } from "@/data/persistences/contracts/StudentRepositoryInterface";
import { createStudentInterface, updateStudentInterface } from '@/data/payload/contracts/StudentContract';
import { StudentApiRequest, UpdateStudentApiRequest } from '@/data/payload/api/StudentApiRequest';
import { Student } from '@/domain/entities/Student';
import axios from 'axios'

export class StudentApiRepository implements StudentRepositoryInterface {

    private service: ApiService
    private mapper: StudentMapper
    private endpoints: Endpoints

    constructor(
        service: ApiService,
        mapper: StudentMapper,
        endpoints: Endpoints,
    ) {
        this.service = service
        this.mapper = mapper
        this.endpoints = endpoints
    }

    public async loadData(params: any): Promise<any | null> {
        const response = await this.service.invoke(
            "get",
            this.endpoints.getStudentList(),
            params,
            {}
        )
        
        return {
            ...response,
            data: {
                ...response.data,
                data: this.mapper.convertStudentsFromApi(response)
            } 
        } 
    }

    public async loadDataDetail(id: number): Promise<any | null> {
        const response = await this.service.invoke(
            "get",
            this.endpoints.getDetailStudent(id),
            id
        )
        return {
            ...response,
            data: {
                ...response.data,
                data: this.mapper.convertStudentFromApi(response)
            }
        } 
    }

    public async postNewStudentData(payload: createStudentInterface): Promise<any> {
        try {
            const req = await this.service.invokePostWithFormData(
                'post',
                this.endpoints.getStudentList(),
                {},
                payload
            )
            return req
        } catch (e) {
            return e.response
        }

    }

    public async updateStudentdData(payload, id: number): Promise<any> {
        try {
            const response = await this.service.invokePostWithFormData(
                "put",
                this.endpoints.updateStudentData(id),
                {},
                payload
            )
            return response
        } catch (error) {
            return error.response
        }
    }

    public async deleteStudentData(id: number): Promise<any> {
            const response = await this.service.invoke(
                "delete",
                this.endpoints.deleteStudentData(id),
                id
            )
            return response
    }
}
