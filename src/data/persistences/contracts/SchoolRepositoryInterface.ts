import { createSchooInterface, updateSchooInterface} from '@/data/payload/contracts/SchoolContract';
import { School } from '@/domain/entities/School';


export interface SchoolRepositoryInterface {
    loadData(params?: any): Promise<any | null>,
    loadDataDetail(id: number): Promise<School | null>,
    postNewSchoolData(payload: createSchooInterface): Promise<any>
    updateSchooldData(payload: updateSchooInterface, id: number): Promise<any>
    deleteSchoolData(id: number): Promise<any>
}
