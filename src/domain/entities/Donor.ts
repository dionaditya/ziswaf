export class Donor {
  id: number;
  company_name: string;
  is_company: boolean;
  name: string;
  position: string;
  email: string;
  address: string;
  phone: string;
  status: number ;
  npwp: number;
  pos_code: number;
  info: string;
  province_id: number;
  regency_id: number;

  constructor(
    id: number,
    company_name: string,
    is_company: boolean,
    name: string,
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
    this.id = id;
    this.company_name = company_name;
    this.is_company = is_company;
    this.name = name;
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
}
export class DonorDetails {
  id: number;
  name: string;
  company_name: string;
  is_company: boolean;
  position: string;
  email: string;
  address: string;
  phone: string;
  status: number;
  npwp: number;
  pos_code: number;
  info: string;
  province_id: number;
  regency_id: number;
  created_at: string;
  updated_at: string;

  constructor(
    id: number,
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
    regency_id: number,
    created_at: string,
    updated_at: string
  ) {
    this.id = id;
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
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}

export class DonorWithSort {
  id: number;
  is_company: boolean | any;
  status: number | string;
  company_name: string;
  address: string;
  regency_id: number;
  province_id: number;
  pos_code: number;
  email: string;
  phone: string;
  npwp: number;
  name: string;
  position: string;
  info: string;

  constructor(
    id: number,
    is_company: boolean | any,
    status: number | string,
    company_name: string,
    address: string,
    regency_id: number,
    province_id: number,
    pos_code: number,
    email: string,
    phone: string,
    npwp: number,
    name: string,
    position: string,
    info: string
  ) {
    this.id = id;
    this.is_company = is_company;
    this.status = status;
    this.company_name = company_name;
    this.address = address;
    this.regency_id = regency_id;
    this.province_id = province_id;
    this.pos_code = pos_code;
    this.email = email;
    this.phone = phone;
    this.npwp = npwp;
    this.name = name;
    this.position = position;
    this.info = info;
  }
}
