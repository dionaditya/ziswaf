import { AxiosResponse } from "axios"
import { singleton } from 'tsyringe'
import { BaseResponseMapper } from './BaseMapper'
import { UserStatus, UserRole } from '@/domain/entities/AllOptions'
import { User } from '@/domain/entities/User'
import moment from 'moment'

@singleton()
export class UserMapper extends BaseResponseMapper {
    public convertUsersFromApi(result: AxiosResponse<any>): User[] | null {

        const { data } = result
        if(data.data === null) {
            return null
        }
        
        return data.data.map(val => {
            const userStatus = UserStatus.filter(e => e[0] === val.status)
            const userRole = UserRole.filter(e => e[0] === val.role)
            return new User(
                val.id,
                val.employee.name,
                val.username,
                val.employee.id,
                val.employee.email,
                val.created_by,
                val.updated_by,
                userStatus[0][1],
                userRole[0][1],
                val.school.name,
                moment(val.last_login).format('dddd, MM YYYY'),  
                moment(val.created_at).format('dddd, MM YYYY'),
                moment(val.updated_at).format('ddd, MM YYYY'),
                val.school.id,
               
            )
        })
    }


    public convertUserFromApi(result: AxiosResponse<any>): User | null {
        const { data} = result.data
        if(data === null) {
            return null
        }


        const userStatus = UserStatus.filter(e => e[0] === data.status)
        const userRole = UserRole.filter(e => e[0] === data.role)
        return new User(
            data.id,
            data.employee.name,
            data.username,
            data.employee.id,
            data.employee.email,
            data.created_by,
            data.updated_by,
            data.status,
            data.role,
            data.school.name,
            moment(data.last_login).format('dddd, MM YYYY'),  
            moment(data.created_at).format('dddd, MM YYYY'),
            moment(data.updated_at).format('ddd, MM YYYY'),
            data.school.id,
        )
    }

    // public requestStudentToApi(result: AxiosResponse<any>): StudentApiRequestResponse{
    //     const { data } = result
    //     return data
    // }


}