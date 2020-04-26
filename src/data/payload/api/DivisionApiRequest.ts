import { CreateDivisionRequestInterface, UpdateDivisionRequestInterface } from '../contracts/DivisionContract';

export class CreateDivisionApiRequest implements CreateDivisionRequestInterface {
    private name: string;
    private description: string;
    private status: number;

    constructor(name: string, description: string, status: number) {
        this.name = name;
        this.description = description;
        this.status = status;
    }

    toJson(): string {
        return JSON.stringify(this)
    }
}

export class UpdateDivisionApiRequest implements UpdateDivisionRequestInterface {
    private name: string;
    private description: string;
    private status: number;

    constructor(name: string, description: string, status: number) {
        this.name = name;
        this.description = description;
        this.status = status;
    }

    toJson(): string {
        return JSON.stringify(this)
    }
}