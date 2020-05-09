import { CreateDonationRequestInterface, UpdateDonationRequestInterface } from '../contracts/DonationContract';

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
    donor_id: number;
    division_id: number;
    category_id: number;
    statement_category_id: number;
    description: string;
    donation_item: number;
    employee_id: any;
    cash: Cash | null;
    goods: Goods | null;

    constructor(
        donor_id: number, division_id: number, category_id: number,
        statement_category_id: number, description: string, donation_item: number, employee_id: any,
        cash: Cash | null, goods: Goods | null
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
                    if(data[val] === null) {
                        return null
                    } else {
                         transformData[val] = data[val]
                    }
                }
            })
            return transformData
        } else {
            return this;
        }
    }
}

export class CreateDonationManualApiRequest implements CreateDonationRequestInterface {
   donor_id: number;
   division_id: number;
   category_id: number;
   statement_category_id: number;
   description: string;
   donation_item: number;
   employee_id: any;
   cash: Cash | null;
   goods: Goods | null;
   created_at: string | any;
   kwitansi: string | any;


    constructor(
        donor_id: number, division_id: number, category_id: number,
        statement_category_id: number, description: string, donation_item: number, employee_id: any,
        cash: Cash | null, goods: Goods | null, created_at: string | any,
        kwitansi: string | any,
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
        this.created_at = created_at 
        this.kwitansi = kwitansi
    }

    toJson(): any {
        if (this.employee_id === '') {
            const data = { ...this }
            const transformData = {}
            Object.keys(data).forEach(val => {
                if (val === 'employee_id') {
                    return null
                } else {
                    if(data[val] === null) {
                        return null
                    } else {
                         transformData[val] = data[val]
                    }
                }
            })
            return transformData
        } else {
            return this;
        }
    }
}

export interface Cash {
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

export class UpdateDonation implements UpdateDonationRequestInterface {
    category_id: number;
    statement_category_id: number;
    description: string;
    item_type: string
    cash: Cash | null;
    goods: Goods | null;

    constructor(
        category_id: number,
        statement_category_id: number,
        description: string,
        item_type: number,
        cash: Cash | null,
        goods: Goods | null,
    ) {
        this.category_id = category_id
        this.statement_category_id = statement_category_id
        this.description = description
        this.item_type = item_type === 1 ? "cashs" : "goods"
        this.cash = cash
        this.goods = goods
    }

    toJson(): any {
        const data = { ...this }
        const transformData = {}
        Object.keys(data).forEach(val => {
            if (val === 'employee_id') {
                return null
            } else {
                if(data[val] === null) {
                    return null
                } else {
                     transformData[val] = data[val]
                }
            }
        })
        return transformData
    }
}