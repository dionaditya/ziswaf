import { City } from './City';

export class Province {
    id: number = 0;
    name: string = "";
    cities?: Array<City> = [];

    constructor(id: number, name: string, city?: Array<City>) {
        this.id = id;
        this.name = name;
        this.cities = city
    }
}