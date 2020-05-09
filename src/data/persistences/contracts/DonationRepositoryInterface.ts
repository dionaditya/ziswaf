import { CreateDonationRequestInterface } from '@/data/payload/contracts/DonationContract';
import { Donation, DonationDetail, DonationTransactionDetail, DonationDetailForEdit } from '@/domain/entities/Donation';

export interface DonationRepositoryInterface {
    getAll(params: object): Promise<Donation[] | null>,
    getAllWithPagination(params: object): Promise<any | null>,
    getById(id: number): Promise<DonationTransactionDetail>,
    getForEdit(id: number): Promise<DonationDetailForEdit>,
    updateDonation(payload, id: number): any,
    store(payload: CreateDonationRequestInterface): Promise<DonationDetail>
    storeManual(payload): Promise<DonationDetail>
    delete(id: number): Promise<any | null>
}