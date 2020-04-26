import { AxiosResponse } from "axios"
import { singleton } from 'tsyringe'
import { BaseResponseMapper } from './BaseMapper'
import { EmployeeStatus} from '@/domain/entities/AllOptions'
import { Employee, EmployeeSortAble } from '@/domain/entities/Employee'
import moment from 'moment'
import 'moment/locale/id'

@singleton()
export class EmployeeMapper extends BaseResponseMapper {
    public convertEmployeesFromApi(result: AxiosResponse<any>): Employee[] | null {

        const { data } = result
        if(data.data === null) {
            return null
        }
        return data.data.map(val => {
            const employeeStatus = EmployeeStatus.filter(data => data[0] === val.status)
            return new EmployeeSortAble(
                val.id,
                val.school_name,
                val.name,
                val.place_of_birth,
                moment(val.birth_of_date).format('dddd, DD MMMM YYYY').toString(),
                val.phone,
                val.email,
                val.address,
                employeeStatus[0][1],
                val.registered_year,
                val.pos_code,
                val.province_name,
                val.regency_name,
                val.image,
            )
        })
    }


    public convertEmployeeFromApi(result: AxiosResponse<any>): Employee | null {
        const { data } = result.data
        if(data === null) {
            return null
        }
        return new Employee(
            data.id,
            data.school_name,
            data.name,
            data.place_of_birth,
            moment(data.birth_of_date).format('dddd, MMMM YYYY').toString(),
            data.phone,
            data.email,
            data.address,
            data.status,
            moment(data.registered_year).format('YYYY-MM-DD'),
            data.pos_code,
            data.province_name,
            data.regency_name,
            data.image,  
        )
    }

    // public requestStudentToApi(result: AxiosResponse<any>): StudentApiRequestResponse{
    //     const { data } = result
    //     return data
    // }


}