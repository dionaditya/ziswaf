export class Category {
    id: number = 0;
    name: string = "";
    description: string = "";
    status: number = 0;
    subCategories: SubCategory[] = []

    constructor(
        id: number,
        name: string,
        description: string,
        status: number
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.status = status;
    }
}

export class SubCategory {
    id: number = 0;
    name: string = "";
    category: Category | undefined;

    constructor(
        id: number,
        name: string
    ) {
        this.id = id
        this.name = name
    }
}

export class StatementCategory {
    id: number = 0;
    statement_category: string = "";

    constructor(
        id: number,
        statement_category: string,
    ) {
        this.id = id;
        this.statement_category = statement_category;
    }
}