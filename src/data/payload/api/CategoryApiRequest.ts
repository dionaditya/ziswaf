import { CreateCategoryRequestInterface, UpdateCategoryRequestInterface } from '../contracts/CategoryContract';

export class CreateCategoryApiRequest implements CreateCategoryRequestInterface {
    private name: string;
    private description: string;
    private status: number;

    constructor(name: string, description: string, status: number) {
        this.name = name;
        this.description = description;
        this.status = status;
    }

    toJson(): string {
        return JSON.stringify(this);
    }
}

export class UpdateCategoryApiRequest implements UpdateCategoryRequestInterface {
    private name: string;
    private description: string;
    private status: number;

    constructor(name: string, description: string, status: number) {
        this.name = name;
        this.description = description;
        this.status = status;
    }

    toJson(): string {
        return JSON.stringify(this);
    }
}