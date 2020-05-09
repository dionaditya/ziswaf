export class Donation {
    id: number;
    donor_name: string;
    city: string;
    division_name: string;
    category_name: string;
    description: string;
    item_type: string;
    ref_number: string;
    item_category: string;
    status: number;
    total: number;
    kwitansi: string;
    unit: string;
    phone: string;
    cash_description: string;
    good_description: string;
    statement_category: string;
    donor_category: boolean | string;
    quantity_good: number;
    good_status: number;
    created_by: string;
    updated_by: string;
    created_at: Date | string;
    updated_at: Date | string;

    constructor(
        id: number,
        donor_name: string,
        city: string,
        division_name: string,
        category_name: string,
        description: string,
        item_type: string,
        ref_number: string,
        item_category: string,
        status: number,
        total: number,
        kwitansi: string,
        unit: string,
        phone: string,
        cash_description: string,
        good_description: string,
        statement_category: string,
        donor_category: boolean | string,
        quantity_good: number,
        good_status: number,
        created_by: string,
        updated_by: string,
        created_at: Date | string,
        updated_at: Date | string,
    ) {
        this.id = id
        this.donor_name = donor_name
        this.city = city
        this.division_name = division_name
        this.category_name = category_name
        this.description = description
        this.item_type = item_type
        this.ref_number = ref_number
        this.item_category = item_category
        this.status = status
        this.total = total
        this.kwitansi = kwitansi
        this.unit = unit
        this.phone = phone
        this.cash_description = cash_description
        this.good_description = good_description
        this.statement_category = statement_category
        this.donor_category = donor_category
        this.quantity_good = quantity_good
        this.good_status = good_status
        this.created_by = created_by
        this.updated_by = updated_by
        this.created_at = created_at
        this.updated_at = updated_at
    }
}

export class DonationDetail {
    id: number
    transaction_id: string

    constructor(
        id: number,
        transaction_id: string,
    ) {
        this.id = id
        this.transaction_id = transaction_id
    }
}

export class DonationTransactionDetail {
    id: number;
    description: string;
    donor_name: string;
    donor_phone: string;
    donor_email: string;
    donor_npwp: number;
    division_name: string;
    unit: string;
    city: string;
    kwitansi: string;
    category: string;
    statement_category: string;
    total: number;
    item_type: string;
    item_category: string;
    ref_number: string;
    quantity: number;
    status: number;
    created_at: Date | string;
    cash_description: string;
    good_description: string;
    donor_category: boolean;
    good_status: any;
    created_by: string;
    donor_address: string;

    constructor(
        id: number,
        description: string,
        donor_name: string,
        donor_phone: string,
        donor_email: string,
        donor_npwp: number,
        division_name: string,
        unit: string,
        city: string,
        kwitansi: string,
        category: string,
        statement_category: string,
        total: number,
        item_type: string,
        item_category: string,
        ref_number: string,
        quantity: number,
        status: number,
        created_at: Date | string,
        cash_description: string,
        good_description: string,
        donor_category: boolean,
        good_status: any,
        created_by: string,
        donor_address: string,
    ) {
        this.id = id
        this.description = description
        this.donor_name = donor_name
        this.donor_phone = donor_phone
        this.donor_email = donor_email
        this.donor_npwp = donor_npwp
        this.division_name = division_name
        this.unit = unit
        this.city = city
        this.kwitansi = kwitansi
        this.category = category
        this.statement_category = statement_category
        this.total = total
        this.item_type = item_type
        this.item_category = item_category
        this.ref_number = ref_number
        this.quantity = quantity
        this.status = status
        this.created_at = created_at
        this.cash_description = cash_description
        this.good_description = good_description
        this.donor_category = donor_category
        this.good_status = good_status
        this.created_by = created_by
        this.donor_address = donor_address
    }
}

export class DonationWithSort {
    id: number;
    donor_id: string;
    regency: string;
    division_id: string;
    category_id: string;
    description: string;
    item_type: string;
    ref_number: string;
    item_id: string;
    status: number | string;
    total: number | string;
    kwitansi: string;
    school_id: string;
    phone: string;
    cash_description: string;
    good_description: string;
    statement_category_id: string;
    donor_category: boolean | string;
    quantity_good: number;
    good_status: any;
    created_by: string;
    updated_by: string;
    created_at: Date | string;
    updated_at: Date | string;

    constructor(
        id: number,
        donor_id: string,
        regency: string,
        division_id: string,
        category_id: string,
        description: string,
        item_type: string,
        ref_number: string,
        item_id: string,
        status: number | string,
        total: number | string,
        kwitansi: string,
        school_id: string,
        phone: string,
        cash_description: string,
        good_description: string,
        statement_category_id: string,
        donor_category: boolean | string,
        quantity_good: number,
        good_status: any,
        created_by: string,
        updated_by: string,
        created_at: Date | string,
        updated_at: Date | string,
    ) {
        this.id = id
        this.donor_id = donor_id
        this.regency = regency
        this.division_id = division_id
        this.category_id = category_id
        this.description = description
        this.item_type = item_type
        this.ref_number = ref_number
        this.item_id = item_id
        this.status = status
        this.total = total
        this.kwitansi = kwitansi
        this.school_id = school_id
        this.phone = phone
        this.cash_description = cash_description
        this.good_description = good_description
        this.statement_category_id = statement_category_id
        this.donor_category = donor_category
        this.quantity_good = quantity_good
        this.good_status = good_status
        this.created_by = created_by
        this.updated_by = updated_by
        this.created_at = created_at
        this.updated_at = updated_at
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

export interface Data {
    id: number;
    category_id: number;
    category_name: string;
    statement_category_id: number;
    statement_category_name: string;
    description: string;
    kwitansi: string;
    item_id: number;
    item_type: string;
    school_id: number;
    status: number;
    cash: Cash;
    goods: Goods;
    created_at: Date;
    updated_at: Date;
}
export class DonationDetailForEdit {
    id: number;
    category_id: number;
    category_name: string;
    statement_category_id: number;
    statement_category_name: string;
    description: string;
    kwitansi: string;
    item_id: number;
    item_type: string;
    school_id: number;
    status: number;
    cash: Cash;
    goods: Goods;
    created_at: Date;
    updated_at: Date;

    constructor(
      data: any
    ) {
        this.id = data.id
        this.category_id = data.category_id
        this.category_name = data.category_name
        this.statement_category_id = data.statement_category_id
        this.statement_category_name = data.statement_category_name
        this.description = data.description
        this.kwitansi = data.kwitansi
        this.item_id = data.item_id
        this.item_type = data.item_type
        this.school_id = data.school_id
        this.status = data.status 
        this.cash = data.cash 
        this.goods = data.goods 
        this.created_at = data.created_at
        this.updated_at = data.updated_at
    }
}