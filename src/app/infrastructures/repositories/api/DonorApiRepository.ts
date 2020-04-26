import { DonorRepositoryInterface } from "@/data/persistences/contracts/DonorRepositoryInterface";
import { Donor, DonorDetails } from "@/domain/entities/Donor";
import {
  CreateDonorRequestInterface,
  UpdateDonorRequestInterface,
} from "@/data/payload/contracts/DonorContract";
import {
  ApiServiceInterface,
  RequestType,
} from "@/data/infrastructures/ApiServiceInterface";
import { DonorMapper } from "@/data/persistences/mappers/DonorMapper";
import { Endpoints } from "../../misc/EndPoints";
import {
  CreateDonorApiRequest,
  UpdateDonorApiRequest,
} from "@/data/payload/api/DonorApiRequest";

export class DonorApiRepository implements DonorRepositoryInterface {
  private service: ApiServiceInterface;
  private mapper: DonorMapper;
  private endpoints: Endpoints;

  constructor(
    service: ApiServiceInterface,
    mapper: DonorMapper,
    endpoints: Endpoints
  ) {
    this.service = service;
    this.mapper = mapper;
    this.endpoints = endpoints;
  }

  public async getAll(params: any): Promise<any | null> {
    const resp = await this.service.invoke(
      RequestType.get,
      this.endpoints.managerDonor(),
      params,
      {}
    );
    return this.mapper.convertDonorListFromApi(resp);
  }

  public async getAllWithPagination(params: object): Promise<any | null> {
    const resp = await this.service.invoke(
      "get",
      this.endpoints.managerDonor(),
      params,
      {}
    );
    return {
      ...resp,
      data: {
        ...resp.data,
        data: this.mapper.convertDonorListFromApiWithPagination(resp),
      },
    };
  }

  public async getById(id: number): Promise<Donor> {
    const resp = await this.service.invoke(
      "get",
      this.endpoints.managerDonor(id),
      {},
      {}
    );
    return this.mapper.convertDonorFromApi(resp);
  }

  public async store(
    payload: CreateDonorRequestInterface
  ): Promise<DonorDetails | any> {
    try {
      const resp = await this.service.invoke(
        "post",
        this.endpoints.managerDonor(),
        {},
        payload as CreateDonorApiRequest
      );

      this.service.invoke("post",
      this.endpoints.managerDonor(),
      {},
      payload as CreateDonorApiRequest).then(res => console.log('response', res)).then(err => console.log('error',err))
   
      console.log(resp)
      return ['success', {
        ...resp,
        data: { ...resp.data, data: this.mapper.convertDonorDetailsFromApi(resp) }
      }]
    } catch (error) {
      console.log(error, error.toJSON())
      return ['error',  error.response ]
    }
  }

  public async storeNewData(  
    payload: CreateDonorRequestInterface
  ): Promise<DonorDetails> {
    const resp = await this.service.invoke(
      "post",
      this.endpoints.updateDonor(),
      {},
      payload as CreateDonorApiRequest
    );
    return this.mapper.convertDonorDetailsFromApi(resp);
  }


  public async update(
    payload: UpdateDonorRequestInterface,
    id: number
  ): Promise<any> {
    try {
      const resp = await this.service.invoke(
        "put",
        this.endpoints.managerDonor(id),
        {},
        payload
      );
      return resp != null;
    } catch (e) {
      return false;
    }
  }

  public async delete(id: number): Promise<Donor[]> {
    try {
      const resp = await this.service.invoke(
        "delete",
        this.endpoints.deleteDonorData(id),
        {},
        id
      );
      return resp;
    } catch (error) {
      return error;
    }
  }
}
