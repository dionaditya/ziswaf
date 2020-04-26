import { singleton } from 'tsyringe';
import { AxiosResponse } from "axios"
import { Prognosis, PrognosisItem } from '@/domain/entities/Prognosis';

@singleton()
export class PrognosisMapper {
    public convertPrognosisFromApi(result: AxiosResponse<any>): Prognosis {
        const aResp = result.data;


        // get total first
        var total = 0;
        var month = 0;
        aResp.data && aResp.data.forEach((item: any) => {
            total += item.total;
            if (month == 0) {
                month = item.month;
            }
        });
        
        // fill items
        var items: Array<PrognosisItem> = [];
        aResp.data && aResp.data.forEach((item: any) => {
            items.push(new PrognosisItem(
                item.id,
                item.month,
                item.total,
                item.total/total * 100,
                item.year,
                item.division_id
            ));
        });

        return new Prognosis(
            total,
            100, // always 100%
            items
        );
    }
}