import { CreatePrognosisRequestInterface } from '../contracts/PrognosisContract';

export class PrognosisData {
    private total: number;
    private month: number;
    private year: number;
    private division_id: number;

    constructor(total: number, month: number, year: number, divisionId: number) {
        this.total = total;
        this.month = month;
        this.year = year;   
        this.division_id = divisionId;
    }
}

export class CreatePrognosisApiRequest implements CreatePrognosisRequestInterface {
    private data: PrognosisData[]

    constructor(data: PrognosisData[]) {
        this.data = data;
    }

    toJson(): string {
        return JSON.stringify(this);
    }
}