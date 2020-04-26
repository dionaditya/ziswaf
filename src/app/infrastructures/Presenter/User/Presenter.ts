import { injectable } from "tsyringe";
import { UserRepositoryInterface } from "@/data/persistences/contracts/UserRepositoryInterface";
import { CreateUserApiRequest, UpdateUserApiRequest, UpdateUserPasswordApiRequest, UpdateUserStatusApiRequest } from '@/data/payload/api/UserApiRequest';
import { User } from '@/domain/entities/User';

@injectable()
export class UserPresenter {
  private repository: UserRepositoryInterface

  constructor(repository: UserRepositoryInterface) {
    this.repository = repository
  }

  public loadData(params?: any): Promise<any | null> {
    return this.repository.loadData(params)
  }

  public loadDataDetail(id: number): Promise<any | null> {
    return this.repository.loadDataDetail(id)
  }

  public postNewUserData(payload: CreateUserApiRequest): Promise<any> {
    return this.repository.postNewUserData(payload)
  }

  public updateUserData(payload: UpdateUserApiRequest, id: number): Promise<any> {
    return this.repository.updateUserdData(payload, id)
  }

  public updatePassword(payload: UpdateUserPasswordApiRequest, id: number, type: string): Promise<any> {
    return this.repository.updatePassword(payload, id, type)
  }

  public deleteUserData(id: number): Promise<any> {
    return this.repository.deleteUserData(id)
  }

  public updateStatusUser(payload: UpdateUserStatusApiRequest, id: number): Promise<any> {
    return this.repository.updateStatusUser(payload, id)
  }
}