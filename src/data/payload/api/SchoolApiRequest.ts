import { createSchooInterface, deleteSchoolInterface } from '../contracts/SchoolContract'


export class SchoolApiRequest implements createSchooInterface {
    name: string;
    phone: string;
    email: string;
    pos_code: number;
    description: string;
    user_id: number;
    province_id: number;
    regency_id: number;
    opened_at: string;
    address: string;

    constructor(
        name: string,
        phone: string,
        email: string,
        pos_code: number,
        description: string,
        user_id: number,
        province_id: number,
        regency_id: number,
        opened_at: string,
        address: string

        ) {
            this.name = name
            this.phone = phone
            this.regency_id = regency_id
            this.email = email
            this.pos_code= pos_code
            this.description = description
            this.user_id = user_id
            this.opened_at = opened_at
            this.province_id = province_id
            this.address = address
    }
    
    public toJson() {
        return JSON.stringify(this)
    }
}

export class DeleteSchoolApiRequest implements deleteSchoolInterface  {
    private id: number

    constructor(id: number) {
        this.id = id
    }

    toJson(): string {
        return JSON.stringify(this);
    }
}