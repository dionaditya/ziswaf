import { CreateDonationRequestInterface } from '@/data/payload/contracts/DonationContract';
import { Donation, DonationDetail, DonationTransactionDetail } from '@/domain/entities/Donation';

export interface DonationRepositoryInterface {
    getAll(params: object): Promise<Donation[] | null>,
    getAllWithPagination(params: object): Promise<any | null>,
    getById(id: number): Promise<DonationTransactionDetail>
    store(payload: CreateDonationRequestInterface): Promise<DonationDetail>
    storeManual(payload: CreateDonationRequestInterface): Promise<DonationDetail>
}