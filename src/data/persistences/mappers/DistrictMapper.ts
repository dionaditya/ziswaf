import { AxiosResponse } from "axios"
import { singleton } from 'tsyringe'
import { BaseResponseMapper } from './BaseMapper'
import { District } from '@/domain/entities/District'


@singleton()
export class DistrictMapper extends BaseResponseMapper {
    public convertDistrictFromApi(result: AxiosResponse<any>): District[] {
        const { data } = result
        return data.data.map(val => 
                new District(
                    val.id, 
                    val.name
                )
            )
    }
}