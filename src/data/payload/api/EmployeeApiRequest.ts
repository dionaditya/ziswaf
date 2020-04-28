import { createEmployeeInterface, deleteEmployeeInterface } from '../contracts/EmployeeContract'
import _ from 'lodash'

export class EmployeeApiRequest implements createEmployeeInterface {
    school_id: number
    name: string
    place_of_birth: string
    birth_of_date: string
    phone: number
    email: string
    address: string
    status: number
    registered_year: string
    pos_code: number
    province_id: any
    regency_id: any
    image?: any


    constructor(
        school_id: number,
        name: string,
        place_of_birth: string,
        birth_of_date: string,
        phone: number,
        email: string,
        address: string,
        status: number,
        registered_year: string,
        pos_code: number,
        province_id: any,
        regency_id: any,
        image?: any,
    ) {
        this.school_id = school_id
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

    public toFormData() {
        const data = this
        const formData = new FormData()
        Object.keys(data).forEach(val => {
            if(data[val] !== null) {
                if (val === 'image') {
                    const [file, name] = data[val]
                    formData.append(val, file, name)
                } else {
                    if(val === 'province_id' || val === 'regency_id') {
                        if(_.isNumber(data[val])) {
                             formData.append(val, data[val])
                        } else {
                            return null
                        }
                    } else {
                        formData.append(val, data[val])
                    }
                    
                }
            } else {
                return null
            }
           
        })
        return formData
    }
}

export class EmployeeApiRequestWithoutImage implements createEmployeeInterface {
    school_id: number
    name: string
    place_of_birth: string
    birth_of_date: string
    phone: number
    email: string
    address: string
    status: number
    registered_year:string
    pos_code: number
    province_id: any
    regency_id: any


    constructor(
        school_id: number,
        name: string,
        place_of_birth: string,
        birth_of_date: string,
        phone: number,
        email: string,
        address: string,
        status: number,
        registered_year: string,
        pos_code: number,
        province_id: any,
        regency_id: any
    ) {
        this.school_id = school_id
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
        
    }

    public toFormData() {
        const data = this
        const formData = new FormData()
        Object.keys(data).forEach(val => {
            if(data[val] !== null || data[val] !== '')  {
                if(val === 'province_id' || val === 'regency_id') {
                    if(_.isNumber(data[val])) {
                        formData.append(val, data[val])
                    } else {
                        return null
                    }
                } else {
                      formData.append(val, data[val])
                }
              
            } else {
                return null
            }
           
        })
        return formData
    }
}

export class DeleteEmployeeApiRequest implements deleteEmployeeInterface {
    private id: number

    constructor(id: number) {
        this.id = id
    }

    toJson(): string {
        return JSON.stringify(this);
    }
}