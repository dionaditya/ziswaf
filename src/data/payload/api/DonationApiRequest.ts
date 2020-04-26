import { CreateDonationRequestInterface } from '../contracts/DonationContract';

export interface Cash {
    type_id: number;
    category_id: number;
    value: number;
    ref_number: string;
}
export interface Goods {
    category_id: number;
    description: string;
    quantity: number;
    value: number;
    status: number;
}

export class CreateDonationApiRequest implements CreateDonationRequestInterface {
    private donor_id: number;
    private division_id: number;
    private category_id: number;
    private statement_category_id: number;
    private description: string;
    private donation_item: number;
    private employee_id: any;
    private cash: Cash;
    private goods: Goods;

    constructor(
        donor_id: number, division_id: number, category_id: number,
        statement_category_id: number, description: string, donation_item: number, employee_id: any,
        cash: Cash, goods: Goods
    ) {
        this.donor_id = donor_id
        this.division_id = division_id
        this.category_id = category_id
        this.statement_category_id = statement_category_id
        this.description = description
        this.donation_item = donation_item
        this.employee_id = employee_id
        this.cash = cash
        this.goods = goods
    }

    toJson(): any {
        if (this.employee_id === '') {
            const data = { ...this }
            const transformData = {}
            Object.keys(data).forEach(val => {
                if (val === 'employee_id') {
                    return null
                } else {
                    transformData[val] = data[val]
                }
            })
            return transformData
        } else {
            return this;
        }
    }
}