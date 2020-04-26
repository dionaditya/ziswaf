import { createEmployeeInterface, deleteEmployeeInterface } from '../contracts/EmployeeContract'

export class EmployeeApiRequest implements createEmployeeInterface {
    school_id: number
    name: string
    place_of_birth: string
    birth_of_date: string
    phone: number
    email: string
    address: string
    status: number
    registered_year: number
    pos_code: number
    province_id: number
    regency_id: number
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
        registered_year: number,
        pos_code: number,
        province_id: number,
        regency_id: number,
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
                    formData.append(val, data[val])
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
    registered_year: number
    pos_code: number
    province_id: number
    regency_id: number


    constructor(
        school_id: number,
        name: string,
        place_of_birth: string,
        birth_of_date: string,
        phone: number,
        email: string,
        address: string,
        status: number,
        registered_year: number,
        pos_code: number,
        province_id: number,
        regency_id: number,
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
            if(data[val] !== null) {
                formData.append(val, data[val])
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