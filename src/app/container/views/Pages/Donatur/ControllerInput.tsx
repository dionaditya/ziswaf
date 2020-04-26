import React, { useState } from "react";
import { container } from "tsyringe";
import { Province } from "@/domain/entities/Province";
import { City } from "@/domain/entities/City";
import { CreateDonorApiRequest, UpdateDonorApiRequest } from "@/data/payload/api/DonorApiRequest";
import { DonorPresenter } from "@/app/infrastructures/Presenter/Donor/Presenter";
import { ProvincePresenter } from "@/app/infrastructures/Presenter/Province/Presenter";
import { CityPresenter } from "@/app/infrastructures/Presenter/City/Presenter";
import {useParams, useLocation} from 'react-router-dom'
import qs from 'qs'

interface InitialState {
  province: any;
  regency: any;
  provinceId: number;
  regencyId: number;
  status: number;
  companyName: string;
  name: string;
  position: string;
  email: string;
  address: string;
  phone: string;
  posCode: number;
  npwp: number;
  info: string;
  checkbox: any;
  setName: Function;
  setCompanyName: Function;
  setCompany: Function;
  setPosition: Function;
  setEmail: Function;
  setAddress: Function;
  setPhone: Function;
  setStatus: Function;
  setNpwp: Function;
  setPosCode: Function;
  setInfo: Function;
  setProvinceId: Function;
  setRegencyId: Function;
  _onStoreCorporate: Function;
  _onStoreRetail: Function;
  handleInput: Function;
  setCheckbox: Function;
  loading: boolean;
  isDetailSession: boolean
}

const initialState = {
  name: "",
  companyName: "",
  isCompany: true,
  position: "",
  email: "",
  address: "",
  phone: "",
  status: 1,
  npwp: 0,
  posCode: 0,
  info: "",
  provinceId: 0,
  regencyId: 0,
  division_id: 1,
  category_id: 0,
  data: {},
  province: [],
  regency: [],
  checkbox: 0,
  setName: () => {},
  setCompanyName: () => {},
  setCompany: () => {},
  setPosition: () => {},
  setEmail: () => {},
  setAddress: () => {},
  setPhone: () => {},
  setStatus: () => {},
  setNpwp: () => {},
  setPosCode: () => {},
  setInfo: () => {},
  setProvinceId: () => {},
  setRegencyId: () => {},
  _onStoreCorporate: () => {},
  _onStoreRetail: () => {},
  handleInput: () => {},
  setCheckbox: () => {},
  isDetailSession: false,
  loading: false
};

export const DonorContext = React.createContext<InitialState>(initialState);
export const { Provider: DonorProvider } = DonorContext;

export const DonorController = ({ children }) => {
  const [name, setName] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [isCompany, setCompany] = useState<boolean>(false);
  const [position, setPosition] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [status, setStatus] = useState<number>(0);
  const [npwp, setNpwp] = useState<number>(0);
  const [posCode, setPosCode] = useState<number>(0);
  const [info, setInfo] = useState<string>("");
  const [provinceId, setProvinceId] = useState<number>(0);
  const [regencyId, setRegencyId] = useState<number>(0);
  const [province, setProvince] = useState<Province[]>([]);
  const [regency, setRegency] = useState<City[]>([]);
  const [checkbox, setCheckbox] = useState(1);
  const [loading, setLoading] = useState(false)
  const [isDetailSession, setDetailSession] = useState(false)

  const donorPresenter: DonorPresenter = container.resolve(DonorPresenter);
  const provincePresenter: ProvincePresenter = container.resolve(
    ProvincePresenter
  );
  const cityPresenter: CityPresenter = container.resolve(CityPresenter);

  const {id} = useParams()
  const location = useLocation()
  const query = qs.parse(location.search)

  console.log(location)

  React.useEffect(() => {
    if(id !== undefined) {
      (async () => {
        const donorData = await donorPresenter.getById(parseInt(id))
        setName(donorData.name)
        setCompanyName(donorData.company_name)
        setCompany(donorData.is_company)
        setPosition(donorData.position)
        setEmail(donorData.email)
        setAddress(donorData.address)
        setPhone(donorData.phone)
        setStatus(donorData.status)
        setNpwp(donorData.npwp)
        setPosCode(donorData.pos_code)
        setInfo(donorData.info)
        setCheckbox(donorData.status)
        const province = await provincePresenter.loadData();
        const city = await cityPresenter.loadData()
        const cityId = await cityPresenter.loadData({search: donorData.regency_id})
        const provinceId = await provincePresenter.loadData({search: donorData.province_id})
        setProvinceId(provinceId[0].id)
        setRegencyId(cityId[0].id)
        setProvince(province)
        setRegency(city)
      })()  
      if(query['?is_detail'] !== undefined) {
        setDetailSession(true)
      } else {
        setDetailSession(false)
      }
      
    } else {
      if(location.pathname === '/dashboard/donatur-perorangan') {
        (async () => {
          const province = await provincePresenter.loadData();
          setProvince(province);
        })();
        setCompany(false)
        if(query['?is_detail'] !== undefined) {
          setDetailSession(true)
        } else {
          setDetailSession(false)
        }
      } else {
        (async () => {
          const province = await provincePresenter.loadData();
          setProvince(province);
        })();
        setCompany(true)
        if(query['?is_detail'] !== undefined) {
          setDetailSession(true)
        } else {
          setDetailSession(false)
        }
      }
    }

  
  }, []);

  const _onStoreCorporate = async (e) => {
    try {
      e.preventDefault();
      if(id === undefined) {

        const resp = await donorPresenter.store(
          new CreateDonorApiRequest(
            name,
            companyName,
            isCompany,
            position,
            email,
            address,
            phone,
            Number(status),
            Number(npwp),
            Number(posCode),
            info,
            Number(provinceId),
            Number(regencyId)
          )
        );
        if (resp) {
          return resp;
        } else {
          return false;
        }
      } else {
        const resp = await donorPresenter.update(
          new UpdateDonorApiRequest(
            name,
            email,
            address,
            phone,
            status,
            npwp,
            Number(posCode),
            info,
            Number(provinceId),
            Number(regencyId)
          ), Number(id)
        );
        if (resp) {
          return resp;
        } else {
          return false;
        }
      }
    
      
    } catch (error) {
      return false;
    }
  };

  const _onStoreRetail = async (e) => {
    try {
      e.preventDefault();
      if(id === undefined) {
        const resp = await donorPresenter.store(
          new CreateDonorApiRequest(
            name,
            companyName,
            !isCompany,
            position,
            email,
            address,
            phone,
            Number(status),
            Number(npwp),
            Number(posCode),
            info,
            Number(provinceId),
            Number(regencyId)
          )
        );
        if (resp) {
          return resp;
        } else {
          return false;
        }
      } else {
        const resp = await donorPresenter.update(
          new UpdateDonorApiRequest(
            name,
            email,
            address,
            phone,
            status,
            npwp,
            Number(posCode),
            info,
            Number(provinceId),
            Number(regencyId)
          ), Number(id)
        );
        if (resp) {
          return resp;
        } else {
          return false;
        }
      }
     
    } catch (error) {
      return false;
    }
  };

  const handleInput = async (e) => {
    if (e.target.name === "province_id") {
      const city = await cityPresenter.loadData({
        filter: {
          province_id: e.target.value,
        },
      });
      setRegency(city);
      setProvinceId(e.target.value);
    } else if (e.target.name === "regency_id") {
      setRegencyId(e.target.value);
    } else {
      setStatus(e.target.value);
    }
  };

  return (
    <DonorProvider
      value={{
        province,
        regency,
        provinceId,
        regencyId,
        status,
        companyName,
        name,
        position,
        email,
        address,
        phone,
        posCode,
        npwp,
        info,
        checkbox,
        setName,
        setCompanyName,
        setCompany,
        setPosition,
        setEmail,
        setAddress,
        setPhone,
        setStatus,
        setNpwp,
        setPosCode,
        setInfo,
        setProvinceId,
        setRegencyId,
        _onStoreCorporate,
        _onStoreRetail,
        handleInput,
        setCheckbox,
        loading,
        isDetailSession
      }}
    >
      {children}
    </DonorProvider>
  );
};
