import { injectable } from "tsyringe";
import { StudentRepositoryInterface} from "@/data/persistences/contracts/StudentRepositoryInterface";
import { StudentApiRequest, UpdateStudentApiRequest } from '@/data/payload/api/StudentApiRequest';
import { Student } from '@/domain/entities/Student';

@injectable()
export class StudentPresenter  {
    private repository: StudentRepositoryInterface

    constructor(repository: StudentRepositoryInterface) {
      this.repository = repository
    }

    public loadData(payload?: any): Promise<any| null> {
        return this.repository.loadData(payload)
    }

    public loadDataDetail(id: number): Promise<any| null> {
      return this.repository.loadDataDetail(id)
    }

    public postNewStudentData(payload: StudentApiRequest): Promise<any> {
      return this.repository.postNewStudentData(payload)
    }

    public updateStudentData(payload, id: number): Promise<any> {
      return this.repository.updateStudentdData(payload, id)
    }

    public deleteStudentData(id: number): Promise<any> {
      return this.repository.deleteStudentData(id)
    }
}