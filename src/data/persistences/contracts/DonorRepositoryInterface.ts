import { Donor, DonorDetails } from "@/domain/entities/Donor";
import {
  CreateDonorRequestInterface,
  UpdateDonorRequestInterface,
  DeleteDonorRequestInterface,
} from "@/data/payload/contracts/DonorContract";

export interface DonorRepositoryInterface {
  getAll(params: Map<string, string>): Promise<Donor[] | null>;
  getAllWithPagination(params: object): Promise<any | null>;
  getById(id: number): Promise<Donor>;
  storeNewData(payload: CreateDonorRequestInterface): Promise<DonorDetails>;
  store(payload: CreateDonorRequestInterface): Promise<DonorDetails>;
  update(
    payload: UpdateDonorRequestInterface,
    id: number
  ): Promise<Donor | any>;
  delete(id: number): Promise<Donor[]>;
}
