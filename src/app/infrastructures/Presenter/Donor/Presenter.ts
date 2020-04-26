import { injectable } from "tsyringe";
import { Donor, DonorDetails } from "@/domain/entities/Donor";
import { DonorApiRepository } from "@/app/infrastructures/repositories/api/DonorApiRepository";
import {
  CreateDonorApiRequest,
  UpdateDonorApiRequest,
} from "@/data/payload/api/DonorApiRequest";

@injectable()
export class DonorPresenter {
  private repository: DonorApiRepository;

  constructor(repository: DonorApiRepository) {
    this.repository = repository;
  }

  public getAll(params?: any): Promise<Donor[] | null> {
    console.log(params)
    return this.repository.getAll(params);
  }

  public getAllWithPagination(params: object): Promise<any | null> {
    console.log(params)
    return this.repository.getAllWithPagination(params);
  }

  public getById(id: number): Promise<Donor> {
    return this.repository.getById(id);
  }

  public store(payload: CreateDonorApiRequest): Promise<DonorDetails> {
    return this.repository.store(payload);
  }

  public storeNewData(payload: CreateDonorApiRequest): Promise<DonorDetails> {
    return this.repository.storeNewData(payload);
  }

  public update(
    payload: UpdateDonorApiRequest,
    id: number
  ): Promise<DonorDetails> {
    return this.repository.update(payload, id);
  }

  public delete(id: number): Promise<Donor[]> {
    return this.repository.delete(id);
  }
}
