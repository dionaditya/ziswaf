export class SchoolData {
    public id: number
    public name: string
    public pos_code: number

    constructor(
        id: number,
        name: string,
        pos_code: number,
    ) {
        this.id = id
        this.name = name
        this.pos_code = pos_code
    }
}

export class EmployeeData {
    public id: number
    public name: string
    public email: string

    constructor(
        id: number,
        name: string,
        email: string,
    ) {
        this.id = id
        this.name = name
        this.email = email
    }
}

export class AuthData {
    public user_id: number
    public token: string
    public username: string
    public status: number
    public role: number
    public expired_at: number
    public school: SchoolData
    public employee: EmployeeData
    public created_at: number
    public updated_at: number

    constructor(
        user_id: number,
        token: string,
        username: string,
        status: number,
        role: number,
        expired_at: number,
        school: SchoolData,
        created_at: number,
        updated_at: number,
        employee: EmployeeData
    ) {
        this.user_id = user_id
        this.token = token
        this.username = username
        this.status = status
        this.role = role
        this.expired_at = expired_at
        this.school = school
        this.created_at = created_at
        this.updated_at = updated_at
        this.employee = employee
    }
}


export class AuthEntity {
    public success: boolean
    public message: string
    public data?: AuthData


    constructor(
        success: boolean,
        message: string,
        data?: AuthData
    ) {
        this.success = success
        this.message = message
        this.data = data
    }
}