import type { AcumaticaClient } from "../AcumaticaClient";
import { QueryOptions } from "../../utils";
import { AxiosResponse } from 'axios';
import { http_join } from "../helpers";

export class Customer {
    #client: AcumaticaClient;

    // ---------------------------- ---------------------------- Class Methods ---------------------------- ---------------------------- \\
    constructor(client: AcumaticaClient) {
        this.#client = client;
    }

    #createUrl(version: string): string {
        return http_join("entity/Default", version, "Customer");
    }

    // ---------------------------- ---------------------------- API Methods ---------------------------- ---------------------------- \\

    // ---------------------------- HTTP Methods ---------------------------- \\
    async get(version: string, odata_options?: QueryOptions): Promise<AxiosResponse<any, any>> {
        return await this.#client.get(this.#createUrl(version), odata_options);
    }

    async post(version: string, json_data?: Record<string, any>, odata_options?: QueryOptions): Promise<AxiosResponse<any, any>> {
        return await this.#client.post(this.#createUrl(version), json_data, odata_options);
    }

    async put(version: string, json_data?: Record<string, any>, odata_options?: QueryOptions): Promise<AxiosResponse<any, any>> {
        return await this.#client.put(this.#createUrl(version), json_data, odata_options);
    }

    async patch(version: string, json_data: Record<string, any>, odata_options?: QueryOptions): Promise<AxiosResponse<any, any>> {
        return await this.#client.patch(this.#createUrl(version), json_data, odata_options);
    }

    async delete(version: string, odata_options?: QueryOptions): Promise<AxiosResponse<any, any>> {
        return await this.#client.delete(this.#createUrl(version), odata_options);
    }

    async head(version: string, odata_options?: QueryOptions): Promise<AxiosResponse<any, any>> {
        return await this.#client.head(this.#createUrl(version), odata_options)
    }

    async options(version: string, odata_options?: QueryOptions): Promise<AxiosResponse<any, any>> {
        return await this.#client.options(this.#createUrl(version), odata_options)
    }
}