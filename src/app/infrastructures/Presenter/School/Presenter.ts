import { injectable } from "tsyringe";
import { SchoolRepositoryInterface} from "@/data/persistences/contracts/SchoolRepositoryInterface";
import { SchoolApiRequest } from '@/data/payload/api/SchoolApiRequest';
import { School } from '@/domain/entities/School';

@injectable()
export class SchoolPresenter  {
    private repository: SchoolRepositoryInterface

    constructor(repository: SchoolRepositoryInterface) {
      this.repository = repository
    }

    public loadData(params?: any): Promise<any | null> {
        return this.repository.loadData(params)
    }

    public loadDataDetail(id: number): Promise<School | null> {
      return this.repository.loadDataDetail(id)
    }

    public postNewSchoolData(payload: SchoolApiRequest): Promise<any> {
      return this.repository.postNewSchoolData(payload)
    }

    public updateSchoolData(payload: SchoolApiRequest, id: number): Promise<any> {
      return this.repository.updateSchooldData(payload, id)
    }

    public deleteSchoolData(id: number): Promise<any> {
      return this.repository.deleteSchoolData(id)
    }

}