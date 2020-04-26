import { CreateUserInterface, UpdateUserInterface, UpdateStatusUserInterface} from '@/data/payload/contracts/UserContract';
import { User } from '@/domain/entities/User';

export interface UserRepositoryInterface {
    loadData(params: any): Promise<any | null>,
    loadDataDetail(id: number, params?: any ): Promise<any | null>,
    postNewUserData(payload: CreateUserInterface): Promise<any>
    updateUserdData(payload: UpdateUserInterface, id: number): Promise<any>,
    updatePassword(payload: UpdateUserInterface, id: number, type: string): Promise<any>
    deleteUserData(id: number): Promise<Boolean>,
    updateStatusUser(payload: UpdateStatusUserInterface, id: number): Promise<any | null>,
}
