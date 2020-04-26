export interface ApiServiceInterface {
    invoke(
        method: any,
        url: string,
        params: Object,
        payload: any,
        headers?: Map<string, string>
        ): Promise<any>
}

export enum RequestType {
    get, post, put, patch, delete
}