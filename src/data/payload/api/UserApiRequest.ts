import { CreateUserInterface, UpdateUserInterface } from '../contracts/UserContract';

export class CreateUserApiRequest implements CreateUserInterface {
    private name: string;
    private username: string;
    private password: string;
    private status: number;
    private role: number;
    private employee_id: number

    constructor(
        name: string, username: string, password: string,
        status: number, role: number, employee_id: number
    ) {
        this.name = name;
        this.username = username;
        this.password = password;
        this.status = status;
        this.role = role;
        this.employee_id = employee_id
    }

    toJson(): string {
        return JSON.stringify(this);
    }
}

export class UpdateUserApiRequest implements UpdateUserInterface {
    private name: string;
    private username: string;
    private password: string;
    private status: number;
    private role: number;

    constructor(
        name: string, username: string, password: string,
        status: number, role: number
    ) {
        this.name = name;
        this.username = username;
        this.password = password;
        this.status = status;
        this.role = role;
    }

    toJson(): string {
        return JSON.stringify(this);
    }
}


export class UpdateUserPasswordApiRequest implements UpdateUserInterface {
    password: string
    new_password: string
    confirm_password: string

    constructor(
        password: string,
        newPassword: string,
        confirm_password: string,
    ) {
        this.password = password
        this.new_password = newPassword
        this.confirm_password = confirm_password
    }

    toJson(): string {
        return JSON.stringify(this);
    }
}

export class DeleteUserApiRequest implements DeleteUserApiRequest {
    private id: number

    constructor(id: number) {
        this.id = id
    }

    toJson(): string {
        return JSON.stringify(this);
    }
}

export class UpdateUserStatusApiRequest implements UpdateUserInterface {
    status: number

    constructor(
        status: number,
    ) {
        this.status = status
    }

    toJson(): string {
        return JSON.stringify(this);
    }
}