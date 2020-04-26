import { AxiosResponse } from "axios"
import { singleton } from 'tsyringe'
import { BaseResponseMapper } from './BaseMapper'
import { School } from '@/domain/entities/School'
import moment from 'moment';
import 'moment/locale/id'
@singleton()
export class SchoolMapper extends BaseResponseMapper {
    public convertSchoolListFromApi(result: AxiosResponse<any>): School[] | []  {
        if(result.data.data === null) {
            return []
        }
        return result.data.data.map(val => {
            return new School(
                val.id,
                val.name,
                val.phone,
                val.email,
                val.pos_code,
                val.description,
                val.user_id,
                val.province_name,
                val.regency_name,
                moment(val.opened_at).format('DD MMMM YYYY'),
                val.report_school,
                val.head_master,
                val.address
            )
        }) 
    }

    public convertSchoolFromApi(result: AxiosResponse<any>): School | null {
        const {data} = result.data
        if(data === null ) {
            return null
        }
        return new School(
            data.id,
            data.name,
            data.phone,
            data.email,
            data.pos_code,
            data.description,
            data.user_id,
            data.province_name,
            data.regency_name,
            moment(data.opened_at).format('DD MMMM YYYY'),
            data.report_school,
            data.head_master,
            data.address
        )
    }
}