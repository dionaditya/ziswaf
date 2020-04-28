import { createSchooInterface, deleteSchoolInterface } from '../contracts/SchoolContract'
import _ from 'lodash'

export class SchoolApiRequest implements createSchooInterface {
    name: string;
    phone: string;
    email: string;
    pos_code: number;
    description: string;
    user_id: number;
    province_id: any;
    regency_id: any;
    opened_at: string;
    address: string;

    constructor(
        name: string,
        phone: string,
        email: string,
        pos_code: number,
        description: string,
        user_id: number,
        province_id: any,
        regency_id: any,
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
        const data= {...this} 
        const transformData = {}
        Object.keys(data).forEach(val => {
            if(data[val] !== null || '') {
                if(val === 'province_id' || val === 'regency_id') {

                     if(_.isNumber(data[val])) {
                          transformData[val] = data[val]
                      } else {
                          return null
                      }
                } else {
                    transformData[val] = data[val]
                }
            } else {
               return null
            }
        })
        return data
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