import { singleton } from "tsyringe";
import { AxiosResponse } from "axios";
import { Donor, DonorDetails, DonorWithSort } from "@/domain/entities/Donor";
import _ from "lodash";
import { CoorporateStatus } from '@/domain/entities/AllOptions';
@singleton()
export class DonorMapper {
  public convertDonorListFromApi(result: AxiosResponse<any>): Donor[] | null {
    const response = Array<Donor>();
    const aResp = result.data;
    if (_.isNil(aResp.data)) {
      return null;
    } else {
      aResp.data.forEach((item: any) => {
        var donor = new Donor(
          item.id,
          item.company_name ? item.company_name : item.name,
          item.is_company,
          item.name,
          item.position,
          item.email,
          item.address,
          item.phone,
          item.status,
          item.npwp,
          item.pos_code,
          item.info,
          item.province_name,
          item.regency_name
        );
        response.push(donor);
      });
      return response;
    }
  }

  public convertDonorFromApi(result: AxiosResponse<any>): Donor {
    const { data } = result.data;
    return new Donor(
      data.id,
      data.company_name ? data.company_name : data.name,
      data.is_company,
      data.name,
      data.position,
      data.email,
      data.address,
      data.phone,
      data.status,
      data.npwp,
      data.pos_code,
      data.info,
      data.province_name,
      data.regency_name
    );
  }

  public convertDonorDetailsFromApi(result: AxiosResponse<any>): DonorDetails {
    const { data } = result;
    return new DonorDetails(
      data.data.id,
      data.data.name,
      data.data.company_name,
      data.data.is_company,
      data.data.position,
      data.data.email,
      data.data.address,
      data.data.phone,
      data.data.status,
      data.data.npwp,
      data.data.pos_code,
      data.data.info,
      data.data.province_id,
      data.data.regency_id,
      data.data.created_at,
      data.data.updated_at
    );
  }

  public convertDonorListFromApiWithPagination(
    result: AxiosResponse<any>
  ): any | null {
    const resp = Array<DonorWithSort>();
    const aResp = result.data;
    if (result.data.data !== null) {
      aResp.data.forEach((item: any) => {
        const donaturStatus = CoorporateStatus.filter(val => val[0] === item.status)
        if(donaturStatus.length <= 0) {
          var donor = new DonorWithSort(
            item.id,
            item.is_company ? "Perusahaan" : "Perorangan",
            'Tidak ada',
            item.company_name ? item.company_name : item.name,
            item.address,
            item.regency_name,
            item.province_name,
            item.pos_code,
            item.email,
            item.phone,
            item.npwp, 
            item.name,
            item.position,
            item.info,
            item.is_company ? item.phone : ''
          );
          resp.push(donor);
        } else {
          var donor = new DonorWithSort(
            item.id,
            item.is_company ? "Perusahaan" : "Perorangan",
            donaturStatus[0][1],
            item.is_company ? item.company_name : item.name,
            item.address,
            item.regency_name,
            item.province_name,
            item.pos_code,
            item.email,
            item.phone,
            item.npwp,
            item.is_company ? item.name : '-',
            item.position,
            item.info,
            item.is_company ? item.phone : ''
          );
          resp.push(donor);
        }
      
      });
      return resp;
    } else {
      return null;
    }
  }
}
