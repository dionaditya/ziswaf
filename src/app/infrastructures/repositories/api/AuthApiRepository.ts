import { LoginApiRequest } from '@/data/payload/api/AuthApiRequest'
import { LoginRequestInterface } from '@/data/payload/contracts/AuthContract'
import { AuthMapper } from '@/data/persistences/mappers/AuthMapper'
import { AuthRepositoryInterface } from '@/data/persistences/contracts/AuthRepositoryInterface'
import { AuthData } from '@/domain/entities/Auth'
import { Endpoints } from '@/app/infrastructures/misc/EndPoints'
import { ApiServiceInterface } from '@/data/infrastructures/ApiServiceInterface'

export class AuthApiRepository implements AuthRepositoryInterface {
    private service: ApiServiceInterface
    private mapper: AuthMapper
    private endpoints: Endpoints

    constructor(
        service: ApiServiceInterface,
        mapper: AuthMapper,
        endpoints: Endpoints,
    ) {
        this.service = service
        this.mapper = mapper
        this.endpoints = endpoints
    }

    public async login(payload: LoginRequestInterface): Promise<AuthData> {
        const response = await this.service.invoke(
            "post",
            this.endpoints.loginUrl(),
            {},
            payload as LoginApiRequest,
        )
        return this.mapper.convertAuthFromApi(response)
    }
}

