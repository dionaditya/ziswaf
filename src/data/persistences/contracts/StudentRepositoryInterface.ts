import { createStudentInterface, updateStudentInterface} from '@/data/payload/contracts/StudentContract';
import { Student } from '@/domain/entities/Student';

export interface StudentRepositoryInterface {
    loadData(payload?: any): Promise<any | null>,
    loadDataDetail(id: number): Promise<any | null>,
    postNewStudentData(payload: createStudentInterface): Promise<any>
    updateStudentdData(payload, id: number): Promise<any>
    deleteStudentData(id: number): Promise<any>
}
