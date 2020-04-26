import { Province } from './Province';

export class City {
    id: number = 0;
    name: string = "";
    province_name: string = "";
    province: Province | undefined;
}

