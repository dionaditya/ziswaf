import { singleton } from 'tsyringe';
import { Province } from '@/domain/entities/Province';
import { AxiosResponse } from 'axios';
import { City } from '@/domain/entities/City';

@singleton()
export class MasterMapper {
    public convertProvinceListFromApi(result: AxiosResponse<any>): Province[] {
        const response = Array<Province>();
        const aResp = result.data;
        aResp.data.forEach((item: any) => {
            var province = new Province(
                item.id,
                item.name
            );
            response.push(province);
        });
        return response;
    }

    public convertProvinceFromApi(result: AxiosResponse<any>): Province {
        const item = result.data;
        var province = new Province(
            item.id,
            item.name
        );

        var cities: City[] = []
        item.regency.forEach((c: any) => {
            var city = new City;
            city.id = c.id;
            city.name = c.name;
            cities.push(city);
        });

        province.cities = cities;
        return province;
    }
}