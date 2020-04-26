export class Employee {
    id: number
    school_name: string
    name: string
    place_of_birth: string
    birth_of_date: Date | string
    phone: string
    email: string
    address: string
    status: number | string
    registered_year: string
    pos_code: number
    province_name: string | number
    regency_name: string | number
    image: string

    constructor(
        id: number,
        school_name: string,
        name: string,
        place_of_birth: string,
        birth_of_date: Date | string,
        phone: string,
        email: string,
        address: string,
        status: number | string,
        registered_year: string,
        pos_code: number,
        province_name: string | number,
        regency_name: string | number,
        image: string,
    ) {
        this.id = id
        this.school_name = school_name
        this.name = name
        this.place_of_birth = place_of_birth
        this.birth_of_date = birth_of_date
        this.phone = phone
        this.email = email
        this.address = address
        this.status = status
        this.registered_year = registered_year
        this.pos_code = pos_code
        this.province_name = province_name
        this.regency_name = regency_name
        this.image = image
    }
}

export class EmployeeSortAble {
    id: number
    school_id: string
    name: string
    place_of_birth: string
    birth_of_date: Date | string
    phone: string
    email: string
    address: string
    status: number | string
    registered_year: string
    pos_code: number
    province_id: string | number
    regency_id: string | number
    image: string

    constructor(
        id: number,
        school_name: string,
        name: string,
        place_of_birth: string,
        birth_of_date: Date | string,
        phone: string,
        email: string,
        address: string,
        status: number | string,
        registered_year: string,
        pos_code: number,
        province_id: string | number,
        regency_id: string | number,
        image: string,
    ) {
        this.id = id
        this.school_id = school_name
        this.name = name
        this.place_of_birth = place_of_birth
        this.birth_of_date = birth_of_date
        this.phone = phone
        this.email = email
        this.address = address
        this.status = status
        this.registered_year = registered_year
        this.pos_code = pos_code
        this.province_id = province_id
        this.regency_id = regency_id
        this.image = image
    }
}


export interface NewEmployee {
    id: number;
    school_id: number;
    name: string;
    place_of_birth: string;
    birth_of_date: Date;
    phone: string;
    email: string;
    address: string;
    status: number;
    registered_year: string;
    pos_code: number;
    province_id: number;
    regency_id: number;
    image: string;
}