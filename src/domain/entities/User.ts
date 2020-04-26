import { Employee } from './Employee'
import { School } from './School'

type UserSchool = Pick<School, "id" | "name" | "pos_code">
type UserEmployee = Pick<Employee, "name" | "email">

export class User {
    id: number;
    name: string;
    username: string;
    employe_id: number;
    created_by: string;
    updated_by: string;
    status: number | string;
    role: number | string;
    school: string;
    email: string;
    school_id: number
    last_login: Date | string;
    created_at: Date | string;
    updated_at: Date | string;

    constructor(
        id: number,
        name: string,
        username: string,
        employe_id: number,
        email: string,
        created_by: string,
        updated_by: string,
        status: number | string,
        role: number | string,
        school: string,
        last_login: Date | string,
        created_at: Date | string,
        updated_at: Date | string,
        school_id: number,
    ) {
        this.id = id
        this.name = name
        this.username = username
        this.employe_id = employe_id
        this.email = email
        this.created_by = created_by
        this.updated_by = updated_by
        this.status = status
        this.role = role
        this.school = school
        this.last_login = last_login
        this.created_at = created_at
        this.updated_at = updated_at
        this.school_id = school_id
    }
}


export interface NewUser {
    name: string;
    username: string;
    password: string;
    status: number;
    role: number;
    employee_id: number;
}

export interface UserNewPassword {
    password: string;
    new_password: string;
    confirm_password: string;
}