import { injectable } from "tsyringe";
import { AuthData } from "@/domain/entities/Auth";
import { AuthRepositoryInterface } from "@/data/persistences/contracts/AuthRepositoryInterface";
import { LoginApiRequest } from "@/data/payload/api/AuthApiRequest"

@injectable()
export class LoginPresenter {
    private repository: AuthRepositoryInterface;

    constructor(repository: AuthRepositoryInterface) {
        this.repository = repository
    }

    public postData(payload: LoginApiRequest): Promise<AuthData> {
        return this.repository.login(payload)
    }
}