import { Category, StatementCategory } from '@/domain/entities/Category';
import { CreateCategoryRequestInterface, UpdateCategoryRequestInterface } from '@/data/payload/contracts/CategoryContract';

export interface CategoryRepositoryInterface {
    getAll(params?: any): Promise<Category[]>
    getAllOperator(params?: any): Promise<Category[]>
    getStatement(params?: any): Promise<StatementCategory[]>
    getById(id: string): Promise<Category>
    store(payload: CreateCategoryRequestInterface): Promise<boolean>
    update(id: string, payload: UpdateCategoryRequestInterface): Promise<boolean>
}