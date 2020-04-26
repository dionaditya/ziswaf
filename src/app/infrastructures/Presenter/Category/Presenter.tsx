import { injectable } from 'tsyringe';
import { CategoryRepositoryInterface } from '@/data/persistences/contracts/CategoryRepositoyInterface'
import { Category, StatementCategory } from '@/domain/entities/Category';
import { CreateCategoryApiRequest } from '@/data/payload/api/CategoryApiRequest';

@injectable()
export class CategoryPresenter {
    private repository: CategoryRepositoryInterface

    constructor(repository: CategoryRepositoryInterface) {
        this.repository = repository
    }

    public getAll(params?: any): Promise<Category[]> {
        return this.repository.getAll(params)
    }

    public getAllOperator(params?: any): Promise<Category[]>{
        return this.repository.getAllOperator(params)
    }

    public getStatement(params?: any): Promise<StatementCategory[]> {
        return this.repository.getStatement(params)
    }

    public getById(id: any): Promise<Category> {
        return this.repository.getById(id)
    }
    
    public store(payload: CreateCategoryApiRequest): Promise<boolean> {
        return this.repository.store(payload);
    }

    
}