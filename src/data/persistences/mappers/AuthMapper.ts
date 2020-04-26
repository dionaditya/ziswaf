import { AxiosResponse } from "axios"
import { AuthData, SchoolData, EmployeeData } from '@/domain/entities/Auth'
import { singleton } from 'tsyringe'

@singleton()
export class AuthMapper {
    public convertAuthFromApi(result: AxiosResponse<any>): AuthData {
        const { data } = result
        return new AuthData(
            data.data.user_id,
            data.data.token,
            data.data.username,
            data.data.status,
            data.data.role,
            data.data.expired_at,
            new SchoolData(
                data.data.school.id,
                data.data.school.name,
                data.data.school.pos_code,
            ),
            data.data.created_at,
            data.data.updated_at,
            new EmployeeData(
                data.data.employee.id,
                data.data.employee.name,
                data.data.employee.email
            ),
        )
    }
}