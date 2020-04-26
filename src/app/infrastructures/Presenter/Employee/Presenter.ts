import { injectable } from "tsyringe";
import { EmployeeRepositoryInterface} from "@/data/persistences/contracts/EmployeeRepositoryInterface";
import { EmployeeApiRequest } from '@/data/payload/api/EmployeeApiRequest';
import { Employee } from '@/domain/entities/Employee';

@injectable()
export class EmployeePresenter  {
    private repository: EmployeeRepositoryInterface

    constructor(repository: EmployeeRepositoryInterface) {
      this.repository = repository
    }

    public loadData(payload?: any): Promise<any | null> {
        return this.repository.loadData(payload)
    }

    public loadDataDetail(id: number): Promise<any | null> {
      return this.repository.loadDataDetail(id)
    }

    public postNewEmployeeData(payload: EmployeeApiRequest): Promise<any> {
      return this.repository.postNewEmployeeData(payload)
    }

    public updateEmployeeData(payload: EmployeeApiRequest, id: number): Promise<any> {
      return this.repository.updateEmployeedData(payload, id)
    }

    public deleteEmployeeData(id: number): Promise<any> {
      return this.repository.deleteEmployeeData(id)
    }
}