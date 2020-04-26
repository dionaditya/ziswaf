import { AxiosResponse } from "axios"
import { singleton } from 'tsyringe'
import { BaseResponseMapper } from './BaseMapper'
import { Province } from '@/domain/entities/Province'


@singleton()
export class ProvinceMapper extends BaseResponseMapper {
    public convertProvinceListFromApi(result: AxiosResponse<any>): Province[] {
        const { data } = result
        if(result.data.data === null) {
            return []
        }
        return data.data.map(val => {
            return new Province(
                val.id,
                val.name
            )
        })
    }

    public convertProvinceDetailFromApi(result: AxiosResponse<any>): Province {
        const { data } = result
        return new Province(
            data.id,
            data.name,
            data.regency
        )
    }
}