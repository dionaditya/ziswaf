import { singleton } from 'tsyringe';
import { Division } from '@/domain/entities/Division';
import { AxiosResponse } from 'axios';

@singleton()
export class DivisionMapper {
    public convertDivisionListFromApi(result: AxiosResponse<any>): Division[] {
        const response = Array<Division>();
        const aResp = result.data;
        aResp.data.forEach((item: any) => {
            var division = new Division(
                item.id,
                item.name,
                item.description,
                item.status
            );
            response.push(division);
        });

        return response;
    }

    public convertDivisionFromApi(result: AxiosResponse<any>): Division {
        const item = result.data;
        return new Division(
            item.id,
            item.name,
            item.description,
            item.status
        );
    }
}