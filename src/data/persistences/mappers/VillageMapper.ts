import { AxiosResponse } from "axios"
import { singleton } from 'tsyringe'
import { BaseResponseMapper } from './BaseMapper'
import { Village } from '@/domain/entities/Village'


@singleton()
export class VillageMapper extends BaseResponseMapper {
    public convertVillageFromApi(result: AxiosResponse<any>): Village[] {
        const { data } = result
        return data.data.map( val =>
            new Village(
                val.id,
                val.name
            )
        )
    }
}