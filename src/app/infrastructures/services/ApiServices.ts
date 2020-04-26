import Axios, { AxiosInstance, Method, AxiosResponse } from "axios";
import qs from "qs";
import { injectable } from "tsyringe";
import { Endpoints } from "../misc/EndPoints";
import { getToken, removeAuthCredential } from '../misc/Cookies';
import BaseRequest from '@/data/payload/api/BaseRequest';
import { ApiServiceInterface } from '@/data/infrastructures/ApiServiceInterface';
import history from "@/app/infrastructures/misc/BrowserHistory";

@injectable()
export default class ApiService implements ApiServiceInterface {
    public client: AxiosInstance;
    
    constructor() {
        this.client = Axios.create({
            baseURL: Endpoints.baseUrl,
            timeout: 50000
        });
        if (process.env.NODE_ENV || process.env.REACT_APP_BASE_URL) {
            this.client.interceptors.response.use(resp => {
                return resp;
            }, function (error) {
                if (error.response.status === 403) {
                    removeAuthCredential()
                    history.push('/login')
                }
            });
        }
    }

    public async invoke<T>(
        method: Method = "get",
        url: string = "",
        params: Object = {},
        payload: any = null,
        headers: Map<string, string> = new Map()): Promise<AxiosResponse<any>> {
        // set common header
        this.client.defaults.headers["Access-Control-Allow-Origin"] = "*";
        this.client.defaults.headers["Content-Type"] = "application/json";
        this.client.defaults.headers["Authorization"] = "Bearer " + getToken();

        headers.forEach((value: string, key: string) => {
            this.client.defaults.headers.common[key] = value;
        });

        var result = await this.client.request({
            url,
            params,
            paramsSerializer: par => qs.stringify(par, { encode: false }),
            data: payload ? JSON.stringify(new BaseRequest<T>(payload)) : null,
            method
        });
        return result;
    }



    public async invokePostWithFormData<T>(
        method: Method = "post",
        url: string = "",
        params: Object = {},
        payload: any = null,
        headers: Map<string, string> = new Map()): Promise<AxiosResponse<any>> {
        // set common header
        let result = await this.client.request({
            url,
            params,
            paramsSerializer: par => qs.stringify(par, { encode: false }),
            data: payload.toFormData(),
            headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${getToken()}` },
            method
        });
        return result;
    }

}
