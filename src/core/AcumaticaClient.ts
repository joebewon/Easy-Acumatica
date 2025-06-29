// Default Imports
import path from 'path';

// Third Party Imports
import axios, { Axios, AxiosRequestConfig, AxiosResponse } from 'axios';

// Local Importspath.join
import { AcumaticaConfig } from '../types';
import { QueryOptions } from '../utils/QueryOptions';
import { http_join } from './helpers';
import { Customer } from './services/Customer';
import { GenericInquiry } from './services/GenericInquiry';

/**
 * An axios wrapper specifically for the Acumatica ERP API.
 *
 * Encapsulates Acumatica API Endpoints into simple asynchronous methods, making *Acumatica Easy*.
 *
 * @example
 * ## Basic Usage
 * ### Manual Login/Logout
 * ```ts
 * import { AcumaticaClient, QueryOptions, QueryOptionsConfig } from 'easy-acumatica';
 * import { AxiosResponse } from 'axios';
 * 
 * async function callAPI(): void {
 *    // Create the client and login.
 *    let client: AcumaticaClient = client = new AcumaticaClient(...);
 *    await client.login();
 *    
 *    // Call the desired endpoint
 *    const response: AxsiosResponse<any, any> = await client.getFromGenericInquiry("Inquiry Title");
 * 
 *    // Logout
 *    await client.logout();
 * }
 * 
 * await callAPI();
 * ```
 * ***
 * ***
 * @TODO Add support for Automatic Per-call Login/Logout
 * @TODO Add support for Per-application Login/Logout
 */
export class AcumaticaClient {
  // ---------------------------- ---------------------------- Member Variables ---------------------------- ---------------------------- \\
  // ---------------------------- HTTP/Axios Config ---------------------------- \\ 
  #full_config: AcumaticaConfig;

  #auth: {
    name: string;
    password: string;
    tenant: string;
    branch?: string;
  };

  #basic_auth: {
    username: string;
    password: string;
  };
  
  #config: {
    headers: {
      [key: string]: any;
    };
    [key: string]: any;
  };

  // ---------------------------- Acumatica Subseervices ---------------------------- \\
  /**
   * Service to specifically call the Customer endpoint.
   */
  customer: Customer;

  /**
   * Service to specifically call a Generic Inquiry
   * ***
   * ***
   * @remarks
   * The inquiry title (`@inquiry_title` for all functions in this subservice) can be found in the Generic Inquiry Profile on our Acumatica site. Simply search 'Generic Inquiry' in the site's search bar.
   * 
   * The `Site Map Title` and the `Workspace` fields are where the common names of the pages appear.
   * 
   * Unfortunately, neither of these fields are searchable, only the `Inquiry Title` field is. So a manual seach is required.
   *
   * But, the `Inquiry Title` field is the inquiry title you need to pass into `@inquiry_title`.
   */
  gi: GenericInquiry;

  // ---------------------------- ---------------------------- Class Methods ---------------------------- ---------------------------- \\
  /**
   * Creates an instance of AcumaticaAPI.
   *
   * @param { string } base_url `string` Base URL of the Acumatica instance.
   * @param { string } username `string` Username for authentication.
   * @param { string } password `string` Password for authentication.
   * @param { string } tenant `string` Tenant name.
   * @param { string } branch `string` (Optional) Branch name.
   * @param { function } create_gi_url `function` (Optional) A function to show this instance how to create the Generic Inquiry Endpoint URL. The string must end with "/", do not include the Inquiry Name, and not all parameters in `@config` need to be used.
   */
  constructor(base_url: string, username: string, password: string, tenant: string, branch?: string, create_gi_url?: (config: AcumaticaConfig) => string) {
    this.#full_config = {
      base_url: base_url,
      username: username,
      password: password,
      tenant: tenant,
      branch: branch
    }
    
    this.#auth = {
      name: username,
      password: password,
      tenant: tenant,
      branch: branch
    };
    
    this.#basic_auth = {
      username: username,
      password: password
    };
    
    this.#config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    this.customer = new Customer(this);  

    this.gi = new GenericInquiry(this, this.#full_config, create_gi_url !== undefined ? create_gi_url(this.#full_config) : http_join(this.#full_config.base_url, "t", this.#full_config.tenant, "api/odata/gi"));
  }

  // ---------------------------- Private Static Helper Methods ---------------------------- \\

  // ---------------------------- Session Methods ---------------------------- \\
  /**
   * @async
   * 
   * Creates an API User for the Acumatica Account being used.
   * 
   * Consumes one of the `Max. Number of Concurrent Logins` field on the Users form (SM201010).
   * - NOTE: Logging into your acumatica site with the Acumatica Account being used as an API Login, also consumes this.
   * 
   * If this is called more than the amount described above (including website logins), this will error, and you may be locked out until one of the API Users expires
   * 
   * Generic Inquiries do not seem to need this endpoint to be called; however, it is unclear if this is permanent nor intended.
   * ***
   * ***
   * @remark
   * There are two distinct things going on here.
   * 1. The Acumatica User
   * 2. The API User
   * 
   * This endpoint creates an API User, not an Acumatica User. The API User it creates is, however, connected to the Acumatica User.
   * 
   * To be clear, the Acumatica User the credentials passed into the the constructor of this Class.
   * ***
   * ***
   * @example
   * ```ts
   * // Create the client login
   * const client: EasyAcumatica = new EasyAcumtica(...);
   * 
   * // Login
   * await client.login();
   * ```
   */
  async login(): Promise<void> {
    try {

      const cookies: string[] = (await axios.post(`${this.#full_config.base_url}/entity/auth/login`, this.#auth, this.#config)).headers['set-cookie'];
      if (cookies) {
        this.#config.headers['Cookie'] = cookies.join('; ');
      }

    } catch (error: any) {
      throw new Error(`Failed to login to Acumatica: ${error.response?.data?.exceptionMessage}`);
    }
  }

  /**
   * @async
   * 
   * Logs an API User out.
   * 
   * NOTE: It is unclear whether this logs out from all API Users. This will be determined for future versions.
   * ***
   * ***
   * @example
   * ```ts
   * // Create the client login
   * const client: EasyAcumatica = new EasyAcumtica(...);
   * 
   * // Login
   * await client.login();
   * 
   * // Logout
   * await api.logout();
   * ```
   */
  async logout(): Promise<void> {
    try {
      if (this.#config.headers['Cookie']) await axios.post(`${this.#full_config.base_url}/entity/auth/logout`, {}, this.#config);

    } catch (error: any) {
      throw new Error(`Failed to login to Acumatica: ${error.response?.data?.exceptionMessage}`);

    } finally {
      delete this.#config.headers['Cookie'];

    }
  }

  // ---------------------------- ---------------------------- API Methods ---------------------------- ---------------------------- \\

  // ---------------------------- HTTP Methods ---------------------------- \\
  async get(url: string | URL, odata_options?: QueryOptions): Promise<AxiosResponse<any, any>> {
    return await this.#_call_api('get', url, odata_options);
  }

  async post(url: string | URL, json_data?: Record<string, any>, odata_options?: QueryOptions): Promise<AxiosResponse<any, any>> {    
    return await this.#_call_api('post', url, odata_options, json_data);
  }

  async put(url: string| URL, json_data?: Record<string, any>, odata_options?: QueryOptions): Promise<AxiosResponse<any, any>> {
    return await this.#_call_api('put', url, odata_options, json_data);
  }

  async patch(url: string | URL, json_data?: Record<string, any>, odata_options?: QueryOptions): Promise<AxiosResponse<any, any>> {   
    return await this.#_call_api('patch', url, odata_options, json_data);
  }

  async delete(url?: string | URL, odata_options?: QueryOptions): Promise<AxiosResponse<any, any>> {
    return await this.#_call_api('delete', url, odata_options);
  }

  async head(url?: string | URL, odata_options?: QueryOptions): Promise<AxiosResponse<any, any>> {
    return await this.#_call_api('head', url, odata_options);
  }

  async options(url?: string | URL, odata_options?: QueryOptions): Promise<AxiosResponse<any, any>> {
    return await this.#_call_api('get', url, odata_options);
  }

  // ---------------------------- Axios Wrapper ---------------------------- \\
  async #_call_api(method: "get" | "post" | "put" | "patch" | "delete" | "head" | "options", url: string | URL, odata_options?: QueryOptions, data?: Record<string, any>): Promise<AxiosResponse<any, any>> {
    if (url instanceof URL) url = url.href;
    
    if (!url.startsWith(this.#full_config.base_url)) url = http_join(this.#full_config.base_url, url);

    url = odata_options !== undefined ? odata_options.build(url) : url;

    const config: AxiosRequestConfig<any> = {
      method: method,
      url: url,
      data: data,
      ...this.#config,
      auth: this.#basic_auth
    };

    try {
      return await axios(config);

    } catch (error: any) {
      throw error
    }
  }
}