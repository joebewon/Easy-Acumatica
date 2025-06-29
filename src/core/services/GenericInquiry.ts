import type { AcumaticaClient } from "../AcumaticaClient";
import { QueryOptions } from "../../utils";
import { AxiosResponse } from 'axios';
import { http_join } from "../helpers";
import { AcumaticaConfig } from "../../types";

export class GenericInquiry {
    #client: AcumaticaClient;
    #client_config: AcumaticaConfig;
    #gi_url: string;

    // ---------------------------- ---------------------------- Class Methods ---------------------------- ---------------------------- \\
    constructor(client: AcumaticaClient, client_config: AcumaticaConfig, gi_url: string) {
        this.#client = client;
        this.#client_config = client_config;
        this.#gi_url = gi_url;
    }

    #createUrl(inquiry_title: string, create_gi_url?: (inquiry_title: string, config: AcumaticaConfig) => string): string {
        return create_gi_url !== undefined ? create_gi_url(inquiry_title, this.#client_config) : http_join(this.#gi_url, inquiry_title);
    }

    // ---------------------------- ---------------------------- API Methods ---------------------------- ---------------------------- \\

    // ---------------------------- HTTP Methods ---------------------------- \\
    /**
     * @async
     * 
     * Function to abstract calls to Acumatica's Generic Inquiries (GIs).
     * 
     * @param { string } inquiry_title `string` The name of the GI we are getting data from. These can be found our Acumatica Tenant Site.
     * @param { QueryOptions } odata_options `QueryOptions` (Optional) The OData query parameter object.
     * @param { function } create_gi_url `function` (Optional) A function that creates the Generic Inquiry URL. Include the Inquiry Name. Not all parameters in `@config` need to be used.
     * @returns `Promise<AxiosResponse<any, any>>` The full response object from Acumatica.
     * 
     * @example
     * ```ts
     * // Create the QueryOptions object
     * const options: QueryOptions = new QueryOptions({
     *    ...
     * });
     * 
     * // Make the API Call
     * const response: AxiosResponse<any, any> = await client.getFromGenericInquiry("Inquiry Title", options, (inquiry_title: string, config: AcumaticaConfig) => {
     *    return `${config.base_url}/gi/${inquiry_title}`;
     * });
     * 
     * // Display the data
     * console.log(response.data);
     * ```
     * ***
     * ***
     * @remarks
     * The inquiry title (`@inquiry_title`) can be found in the Generic Inquiry Profile on our Acumatica site. Simply search 'Generic Inquiry' in the site's search bar.
     * 
     * The `Site Map Title` and the `Workspace` fields are where the common names of the pages appear.
     * 
     * Unfortunately, neither of these fields are searchable, only the `Inquiry Title` field is. So a manual seach is required.
     *
     * But, the `Inquiry Title` field is the inquiry title you need to pass into `@inquiry_title`.
     */
    async get(inquiry_title: string, odata_options?: QueryOptions, create_gi_url?: (inquiry_title: string, config: AcumaticaConfig) => string): Promise<AxiosResponse<any, any>> {
        return this.#client.get(this.#createUrl(inquiry_title, create_gi_url), odata_options);
    }

    async post(inquiry_title: string, json_data?: Record<string, any>, odata_options?: QueryOptions, create_gi_url?: (inquiry_title: string, config: AcumaticaConfig) => string): Promise<AxiosResponse<any, any>> {
        return this.#client.post(this.#createUrl(inquiry_title, create_gi_url), json_data, odata_options);
    }

    async put(inquiry_title: string, json_data?: Record<string, any>, odata_options?: QueryOptions, create_gi_url?: (inquiry_title: string, config: AcumaticaConfig) => string): Promise<AxiosResponse<any, any>> {
        return this.#client.put(this.#createUrl(inquiry_title, create_gi_url), json_data, odata_options);
    }

    async patch(inquiry_title: string, json_data: Record<string, any>, odata_options?: QueryOptions, create_gi_url?: (inquiry_title: string, config: AcumaticaConfig) => string): Promise<AxiosResponse<any, any>> {
        return this.#client.patch(this.#createUrl(inquiry_title, create_gi_url), json_data, odata_options);
    }

    async delete(inquiry_title: string, odata_options?: QueryOptions, create_gi_url?: (inquiry_title: string, config: AcumaticaConfig) => string): Promise<AxiosResponse<any, any>> {
        return this.#client.delete(this.#createUrl(inquiry_title, create_gi_url), odata_options);
    }

    async head(inquiry_title: string, odata_options?: QueryOptions, create_gi_url?: (inquiry_title: string, config: AcumaticaConfig) => string): Promise<AxiosResponse<any, any>> {
        return this.#client.head(this.#createUrl(inquiry_title, create_gi_url), odata_options)
    }

    async options(inquiry_title: string, odata_options?: QueryOptions, create_gi_url?: (inquiry_title: string, config: AcumaticaConfig) => string): Promise<AxiosResponse<any, any>> {
        return this.#client.options(this.#createUrl(inquiry_title, create_gi_url), odata_options)
    }
}