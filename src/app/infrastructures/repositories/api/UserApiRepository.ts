import ApiService from "@/app/infrastructures/services/ApiServices";
import { Endpoints } from "@/app/infrastructures/misc/EndPoints";
import { UserMapper } from "@/data/persistences/mappers/UserMapper";
import { UserRepositoryInterface } from "@/data/persistences/contracts/UserRepositoryInterface";
import { CreateUserInterface, UpdateUserInterface, UpdateStatusUserInterface } from '@/data/payload/contracts/UserContract';
import { CreateUserApiRequest, UpdateUserApiRequest, UpdateUserPasswordApiRequest, UpdateUserStatusApiRequest } from '@/data/payload/api/UserApiRequest';


export class UserApiRepository implements UserRepositoryInterface {


    private service: ApiService
    private mapper: UserMapper
    private endpoints: Endpoints

    constructor(
        service: ApiService,
        mapper: UserMapper,
        endpoints: Endpoints,
    ) {
        this.service = service
        this.mapper = mapper
        this.endpoints = endpoints
    }

    public async loadData(params?: any): Promise<any | null> {
        const response = await this.service.invoke(
            "get",
            this.endpoints.managerUser(),
            params,
            {}
        )
        return {
            ...response,
            data: {
                ...response.data,
                data:  this.mapper.convertUsersFromApi(response)
            }
        }
    }

    public async loadDataDetail(id?: number, params?: any, ): Promise<any | null> {
        const response = await this.service.invoke(
            "get",
            this.endpoints.managerUser(id),
            params
        )
        return {
            ...response,
            data: {
                ...response.data,
                data:  this.mapper.convertUserFromApi(response)
            }
        }
    }

    public async postNewUserData(payload: CreateUserInterface): Promise<any> {
        try {
            const response = await this.service.invoke(
                "post",
                this.endpoints.managerUser(),
                {},
                payload as CreateUserApiRequest
            )
            return response
        } catch (error) {
            return error.response
        }

    }

    public async updateUserdData(payload: UpdateUserInterface, id: number): Promise<any> {
        try {
            const response = await this.service.invoke(
                "put",
                this.endpoints.managerUser(id),
                {},
                payload as UpdateUserApiRequest
            )
            return response
        } catch (error) {
            return error.response
        }
    }

    public async updateStatusUser(payload: UpdateStatusUserInterface, id: number): Promise<any> {
        try {
            const response = await this.service.invoke(
                "put",
                this.endpoints.managerChangeStatusUser(id),
                {},
                payload as UpdateUserStatusApiRequest
            )
            return response
        } catch (error) {
            return error.response
        }
    }

    public async updatePassword(payload: UpdateUserInterface, id: number, type: string): Promise<any> {
        try {
            const response = await this.service.invoke(
                "put",
                this.endpoints.changePasswordUser(id, type),
                {},
                payload as UpdateUserPasswordApiRequest
            )
            return response
        } catch (error) {
            return error.response
        }
    }

    public async deleteUserData(id: number): Promise<any> {
        try {
            const response = await this.service.invoke(
                "delete",
                this.endpoints.deleteUserData(id),
                id
            )
            return response
        } catch (error) {
            return error.response
        }
    }
}
