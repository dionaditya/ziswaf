import { AxiosResponse } from "axios"
import { singleton } from 'tsyringe'
import { BaseResponseMapper } from './BaseMapper'
import { City } from '@/domain/entities/City'


@singleton()
export class CityMapper extends BaseResponseMapper {
    public convertCityFromApi(result: AxiosResponse<any>): City[] {
        const { data } = result
        if(result.data.data === null) {
            return []
        }
        return data.data.map(val => {
            const city = new City()
            city.id = val.id
            city.name = val.name
            city.province_name = val.province_name
            return city
            }         
        )
    }
}