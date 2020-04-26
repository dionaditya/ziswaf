import { AuthData } from '@/domain/entities/Auth'
import { LoginRequestInterface } from '@/data/payload/contracts/AuthContract';

export interface AuthRepositoryInterface {
    login(payload: LoginRequestInterface): Promise<AuthData>
}
