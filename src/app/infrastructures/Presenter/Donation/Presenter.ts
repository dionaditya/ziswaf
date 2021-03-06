import { injectable } from 'tsyringe';
import { DonationRepositoryInterface } from '@/data/persistences/contracts/DonationRepositoryInterface';
import { Donation, DonationDetail, DonationTransactionDetail, DonationDetailForEdit } from '@/domain/entities/Donation';
import { CreateDonationApiRequest } from '@/data/payload/api/DonationApiRequest';

@injectable()
export class DonationPresenter {
    private repository: DonationRepositoryInterface

    constructor(repository: DonationRepositoryInterface) {
        this.repository = repository
    }

    public getAll(params: object): Promise<Donation[] | null> {
        return this.repository.getAll(params)
    }

    public getAllWithPagination(params: object): Promise<any | null> {
        return this.repository.getAllWithPagination(params)
    }

    public getById(id: number): Promise<DonationTransactionDetail> {
        return this.repository.getById(id)
    }

    public store(payload: CreateDonationApiRequest): Promise<DonationDetail> {
        return this.repository.store(payload);
    }

    public storeManual(payload): Promise<DonationDetail> {
        return this.repository.storeManual(payload);
    }

    public delete(id: number): Promise<any | null> {
        return this.repository.delete(id);
    }

    public getForEdit(id: number): Promise<DonationDetailForEdit> {
        return this.repository.getForEdit(id)
    }

    public updateDonation(payload, id: number): Promise<any> {
        return this.repository.updateDonation(payload, id)
    }
}