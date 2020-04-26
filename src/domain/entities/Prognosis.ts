export class PrognosisItem {
    id: number = 0;
    month: string = "";
    total: number = 0;
    percentage: number = 0;
    year: number = 0;
    division_id: number | null

    constructor(id: number, month: string, total: number, percentage: number, year: number, division_id: number) {
        this.id = id;
        this.month = month;
        this.total = total;
        this.percentage = percentage;
        this.year = year;
        this.division_id = division_id;
    }
}

export class Prognosis {
    total: number = 0;
    percentage: number = 0;
    items: Array<PrognosisItem> = [];

    constructor(total: number, percentage: number, items: Array<PrognosisItem>) {
        this.total = total;
        this.percentage = percentage;
        this.items = items;
    }
    
}
