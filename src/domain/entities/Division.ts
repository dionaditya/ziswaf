export class Division {
    id: number = 0;
    name: string = "";
    description: string = "";
    status: number = 0;

    constructor(
        id: number,
        name: string,
        description: string,
        status: number,
    ) {
        this.id = id
        this.name = name
        this.description = description
        this.status = status
    }
}