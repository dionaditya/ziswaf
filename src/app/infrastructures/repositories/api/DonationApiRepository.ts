import { ApiServiceInterface, RequestType } from '@/data/infrastructures/ApiServiceInterface';
import { Endpoints } from '../../misc/EndPoints';
import { DonationRepositoryInterface } from '@/data/persistences/contracts/DonationRepositoryInterface';
import { DonationMapper } from '@/data/persistences/mappers/DonationMapper';
import { CreateDonationRequestInterface } from '@/data/payload/contracts/DonationContract';
import { Donation, DonationDetail, DonationTransactionDetail } from '@/domain/entities/Donation';
import { CreateDonationApiRequest } from '@/data/payload/api/DonationApiRequest';

export class DonationApiRepository implements DonationRepositoryInterface {
    private service: ApiServiceInterface;
    private mapper: DonationMapper;
    private endpoints: Endpoints;

    constructor(service: ApiServiceInterface, mapper: DonationMapper, endpoints: Endpoints) {
        this.service = service;
        this.mapper = mapper;
        this.endpoints = endpoints;
    }
    
    public async getAll(params: object): Promise<Donation[] | null> {
        const resp = await this.service.invoke(
            'get',
            this.endpoints.managerDonation(), 
            params, 
            {}
        );
        return this.mapper.convertDonationListFromApi(resp);
    }

    public async getAllWithPagination(params: object): Promise<any | null> {
        const resp = await this.service.invoke(
            'get',
            this.endpoints.managerDonation(), 
            params, 
            {}
        )
        return {
            ...resp,
            data: {
                ...resp.data,
                data: this.mapper.convertDonationListFromApiWithPagination(resp)
            }
        }
       
    }

    public async getById(id: number): Promise<DonationTransactionDetail> {
        const resp = await this.service.invoke(
            'get',
            this.endpoints.managerDonationDetail(id), 
            {},
            {}
        );
        return this.mapper.convertDonatioDetailFromApi(resp);
    }


    public async store(payload: CreateDonationRequestInterface): Promise<DonationDetail> {
            const resp = await this.service.invoke(
                'post', 
                this.endpoints.managerDonation(), 
                {}, 
                payload.toJson()
            );

            return this.mapper.convertCreateDonationListFromApi(resp)
    }

    public async storeManual(payload: CreateDonationRequestInterface): Promise<DonationDetail> {
        const resp = await this.service.invoke(
            'post', 
            this.endpoints.managerDonationManual(), 
            {}, 
            payload as CreateDonationApiRequest
        );

        return this.mapper.convertCreateDonationListFromApi(resp)
}
    
}