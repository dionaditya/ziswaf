import { AxiosResponse } from "axios"
import { singleton } from 'tsyringe'
import { BaseResponseMapper } from './BaseMapper'
import { Record } from '@/domain/entities/Record'


@singleton()
export class RecordMapper extends BaseResponseMapper {
    public convertRecordListFromApi(result: AxiosResponse<any>): Record | null {
        const { data } = result
        if (result.data.data === null) {
            return null
        }
        return new Record(
            data.data.id,
            data.data.name,
            data.data.donation_record,
            data.data.personel_record,
            data.data.student_record,
        )
    }
}