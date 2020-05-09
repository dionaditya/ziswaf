import ApiService from "@/app/infrastructures/services/ApiServices";
import { Endpoints } from "@/app/infrastructures/misc/EndPoints";
import { ProvinceMapper } from '@/data/persistences/mappers/ProvinceMapper'
import { Province } from '@/domain/entities/Province';
import { RecordRepositoryInterface } from '@/data/persistences/contracts/RecordRepositoryInterface';
import { Record } from '@/domain/entities/Record';
import { RecordMapper } from '@/data/persistences/mappers/RecordMapper';

export class RecordApiRepository implements RecordRepositoryInterface{
    private service: ApiService
    private mapper: RecordMapper
    private endpoints: Endpoints

    constructor(
        service: ApiService,
        mapper: RecordMapper,
        endpoints: Endpoints,
    ) {
        this.service = service
        this.mapper = mapper
        this.endpoints = endpoints
    }

    public async getRecord(id: number): Promise<Record | null> {
        const response = await this.service.invoke(
            "get",
            this.endpoints.getRecordSchool(id),
            {}
        )
        return this.mapper.convertRecordListFromApi(response)

    }
}
