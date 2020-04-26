import { createEmployeeInterface, updateEmployeeInterface} from '@/data/payload/contracts/EmployeeContract';
import { Employee } from '@/domain/entities/Employee';

export interface EmployeeRepositoryInterface {
    loadData(params: any): Promise<any | null>,
    loadDataDetail(id: number, params?: any ): Promise<any| null>,
    postNewEmployeeData(payload: createEmployeeInterface): Promise<any>
    updateEmployeedData(payload: updateEmployeeInterface, id: number): Promise<any>,
    deleteEmployeeData(id: number): Promise<any>
}
