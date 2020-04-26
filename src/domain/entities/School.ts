interface ReportSchool {
    total_employee: number,
    total_teacher: number,
    total_social_employee: number,
    total_student: number,
}

interface HeadMaster {
    id: number,
    name: string,
    email: string,
    phone: string
    image: string
}

export class School {
    id: number;
    name: string;
    phone: string;
    email: string;
    pos_code: number;
    description: string;
    user_id: number;
    province_name: string;
    regency_name: string;
    opened_at: string;
    report_school: ReportSchool;
    head_master: HeadMaster
    address: string;

    constructor(
        id: number,
        name: string,
        phone: string,
        email: string,
        pos_code: number,
        description: string,
        user_id: number,
        province_name: string,
        regency_name: string,
        opened_at: string,
        report_school: ReportSchool,
        head_master: HeadMaster,
        address: string
        ) {
            this.id = id;
            this.name = name
            this.phone = phone
            this.regency_name = regency_name
            this.email = email
            this.pos_code= pos_code
            this.description = description
            this.user_id = user_id
            this.opened_at = opened_at
            this.province_name = province_name
            this.report_school = report_school
            this.head_master = head_master
            this.address = address
    }
}

export class PostSchoolEntity {
    id: number;
    name: string;
    phone: string;
    email: string;
    pos_code: number;
    description: string;
    user_id: number;
    province_id: number;
    regency_id: number;
    opened_at: Date;

    constructor(
        id: number,
        name: string,
        phone: string,
        email: string,
        pos_code: number,
        description: string,
        user_id: number,
        province_id: number,
        regency_id: number,
        opened_at: Date,

        ) {
            this.id = id;
            this.name = name
            this.phone = phone
            this.regency_id = regency_id
            this.email = email
            this.pos_code= pos_code
            this.description = description
            this.user_id = user_id
            this.opened_at = opened_at
            this.province_id = province_id
    }
}


