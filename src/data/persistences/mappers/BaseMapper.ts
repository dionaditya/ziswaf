import { AxiosResponse } from "axios";
import { BaseEntity } from "@/domain/entities/Base";

export class BaseResponseMapper {
  public convertBaseResponseFromApi(result: AxiosResponse<any>): BaseEntity {
    const { data } = result;
    return new BaseEntity(data.success, data.message, data.pagionation);
  }
}
