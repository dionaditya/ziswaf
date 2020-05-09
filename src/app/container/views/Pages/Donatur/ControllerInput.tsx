import React, { useState } from "react";
import { container } from "tsyringe";
import { Province } from "@/domain/entities/Province";
import { City } from "@/domain/entities/City";
import {
  CreateDonorApiRequest,
  UpdateDonorApiRequest,
} from "@/data/payload/api/DonorApiRequest";
import { DonorPresenter } from "@/app/infrastructures/Presenter/Donor/Presenter";
import { ProvincePresenter } from "@/app/infrastructures/Presenter/Province/Presenter";
import { CityPresenter } from "@/app/infrastructures/Presenter/City/Presenter";
import { useParams, useLocation } from "react-router-dom";
import qs from "qs";

interface InitialState {
  province: any;
  regency: any;
  provinceId: any;
  regencyId: any;
  status: any;
  companyName: string;
  name: string;
  position: string;
  email: string;
  address: string;
  phone: string;
  posCode: any;
  npwp: any | null;
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
  isDetailSession: boolean;
  postUpdateData: Function;
}

const initialState = {
  name: "",
  companyName: "",
  isCompany: true,
  position: "",
  email: "",
  address: "",
  phone: "",
  status: "",
  npwp: "",
  posCode: "",
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
  loading: false,
  postUpdateData: () => {},
};

export const DonorContext = React.createContext<InitialState>(initialState);
export const { Provider: DonorProvider } = DonorContext;

export const DonorController = ({ children }) => {
  const [name, setName] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [isCompany, setCompany] = useState<boolean>(true);
  const [position, setPosition] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [status, setStatus] = useState<any>("");
  const [npwp, setNpwp] = useState<any | null>("");
  const [posCode, setPosCode] = useState<any>("");
  const [info, setInfo] = useState<string>("");
  const [provinceId, setProvinceId] = useState<any>("");
  const [regencyId, setRegencyId] = useState<any>("");
  const [province, setProvince] = useState<Province[]>([]);
  const [regency, setRegency] = useState<City[]>([]);
  const [checkbox, setCheckbox] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isDetailSession, setDetailSession] = useState(false);

  const donorPresenter: DonorPresenter = container.resolve(DonorPresenter);
  const provincePresenter: ProvincePresenter = container.resolve(
    ProvincePresenter
  );
  const cityPresenter: CityPresenter = container.resolve(CityPresenter);

  const { id } = useParams();
  const location = useLocation();
  const query = qs.parse(location.search);

  console.log(location);

  React.useEffect(() => {
    if (id !== undefined) {
      (async () => {
        setLoading(true);
        const donorData = await donorPresenter.getById(parseInt(id));
        const province = await provincePresenter.loadData();
        const city = await cityPresenter.loadData();
        setName(donorData.name);
        setCompanyName(donorData.company_name);
        setCompany(donorData.is_company);
        setPosition(donorData.position);
        setEmail(donorData.email);
        setAddress(donorData.address);
        setPhone(donorData.phone);
        setStatus(donorData.status);
        setNpwp(donorData.npwp);
        setPosCode(donorData.pos_code);
        setInfo(donorData.info);
        setCheckbox(donorData.status);

        setProvinceId(donorData.province_id);
        setRegencyId(donorData.regency_id);
        setProvince(province);
        setRegency(city);
        setLoading(false);
      })();
      if (query["?is_detail"] !== undefined) {
        setDetailSession(true);
      } else {
        setDetailSession(false);
      }
    } else {
      if (location.pathname === "/dashboard/donatur-perorangan") {
        (async () => {
          const province = await provincePresenter.loadData();
          setProvince(province);
        })();
        setCompany(false);
        if (query["?is_detail"] !== undefined) {
          setDetailSession(true);
        } else {
          setDetailSession(false);
        }
      } else {
        (async () => {
          const province = await provincePresenter.loadData();
          setProvince(province);
        })();
        setCompany(true);
        if (query["?is_detail"] !== undefined) {
          setDetailSession(true);
        } else {
          setDetailSession(false);
        }
      }
    }
  }, []);

  const phoneNumber: any = phone
    .slice(3, phone.length)
    .replace(/\s+/g, "")
    .match(/(\d+)/);

  const _onStoreCorporate = async (e) => {
    if (id === undefined) {
      const resp = await donorPresenter.store(
        new CreateDonorApiRequest(
          name,
          companyName,
          isCompany,
          position,
          email,
          address,
          phoneNumber[0],
          Number(status),
          Number(npwp),
          Number(posCode),
          info,
          provinceId,
          regencyId
        )
      );
      return resp;
    } else {
      const resp = await donorPresenter.update(
        new UpdateDonorApiRequest(
          name,
          companyName,
          isCompany,
          position,
          email,
          address,
          phoneNumber[0],
          Number(status),
          Number(npwp),
          Number(posCode),
          info,
          provinceId,
          regencyId
        ),
        Number(id)
      );
      return resp;
    }
  };

  const _onStoreRetail = async (e) => {
    if (id === undefined) {
      const resp = await donorPresenter.store(
        new CreateDonorApiRequest(
          name,
          "",
          false,
          position,
          email,
          address,
          phoneNumber[0],
          Number(checkbox),
          Number(npwp),
          Number(posCode),
          info,
          provinceId,
          regencyId
        )
      );
      return resp;
    } else {
      const resp = await donorPresenter.update(
        new UpdateDonorApiRequest(
          name,
          "",
          false,
          position,
          email,
          address,
          phoneNumber[0],
          Number(checkbox),
          Number(npwp),
          Number(posCode),
          info,
          provinceId,
          regencyId
        ),
        Number(id)
      );
      return resp;
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

  const postUpdateData = async () => {
    const res = await donorPresenter.storeNewData(
      new CreateDonorApiRequest(
        name,
        companyName,
        isCompany,
        position,
        email,
        address,
        phoneNumber[0],
        Number(status),
        Number(npwp),
        Number(posCode),
        info,
        provinceId,
        regencyId
      )
    );
    return res;
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
        isDetailSession,
        postUpdateData,
      }}
    >
      {children}
    </DonorProvider>
  );
};
