import {
  CreateDonorRequestInterface,
  UpdateDonorRequestInterface,
  DeleteDonorRequestInterface,
} from "../contracts/DonorContract";
import _ from 'lodash'

export class CreateDonorApiRequest implements CreateDonorRequestInterface {
  private name: string;
  private company_name: string;
  private is_company: boolean;
  private position: string;
  private email: string;
  private address: string;
  private phone: string;
  private status: number;
  private npwp: number;
  private pos_code: number;
  private info: string;
  private province_id: number;
  private regency_id: number;

  constructor(
    name: string,
    company_name: string,
    is_company: boolean,
    position: string,
    email: string,
    address: string,
    phone: string,
    status: number,
    npwp: number,
    pos_code: number,
    info: string,
    province_id: number,
    regency_id: number
  ) {
    this.name = name;
    this.company_name = company_name;
    this.is_company = is_company;
    this.position = position;
    this.email = email;
    this.address = address;
    this.phone = phone;
    this.status = status;
    this.npwp = npwp;
    this.pos_code = pos_code;
    this.info = info;
    this.province_id = province_id;
    this.regency_id = regency_id;
  }

  public toJson() {
    const data = {
      name: this.name,
      companyName: this.company_name,
      isCompany: this.is_company,
      position: this.position,
      email: this.email,
      address: this.address,
      phone: this.phone,
      status: this.status,
      npwp: this.npwp,
      posCode: this.pos_code,
      info: this.info,
      provinceId: this.province_id,
      regencyId: this.regency_id,
    };
    return JSON.stringify({
      data,
    });
  }
}

export class UpdateDonorApiRequest implements UpdateDonorRequestInterface {
    private name: string;
  private company_name: string;
  private is_company: boolean;
  private position: string;
  private email: string;
  private address: string;
  private phone: string;
  private status: number;
  private npwp: number;
  private pos_code: number;
  private info: string;
  private province_id: any;
  private regency_id: number;

  constructor(
    name: string,
    company_name: string,
    is_company: boolean,
    position: string,
    email: string,
    address: string,
    phone: string,
    status: number,
    npwp: number,
    pos_code: number,
    info: string,
    province_id: any,
    regency_id: any
  ) {
    this.name = name;
    this.email = email;
    this.address = address;
    this.phone = phone;
    this.status = status;
    this.npwp = npwp;
    this.pos_code = pos_code;
    this.position = position
    this.company_name = company_name
    this.is_company = is_company
    this.info = info;
    this.province_id = _.isNumber(province_id) ? province_id : '' ;
    this.regency_id = _.isNumber(regency_id) ? regency_id : '';
  }

  toJson(): any {
    const data = {...this}
    const transformData = {}
    Object.keys(data).forEach(val => {
      if(val === 'province_id' || val === "regency_id") {
         if(_.isNumber(data[val])) {
           transformData[val] = data[val]
         } else {
           return null
         }
      } else {
         if(data[val] === '') {
           return null
         } else {
            transformData[val] = data[val]
         }
        
      }
    })
    return transformData
  }
}

export class DeleteDonorApiRequest implements DeleteDonorRequestInterface {
  private id: number;

  constructor(id: number) {
    this.id = id;
  }

  toJson(): string {
    return JSON.stringify(this);
  }
}
