// Default Imports
import path from 'path';

// Third Party Imports
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

// Local Importspath.join
import { AcumaticaConfig } from '../types';
import { QueryOptions } from '../utils/QueryOptions';

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
  private full_config: AcumaticaConfig;

  private auth: {
    name: string;
    password: string;
    tenant: string;
    branch?: string;
  };

  private basic_auth: {
    username: string;
    password: string;
  };
  
  private config: {
    headers: {
      [key: string]: any;
    };
    [key: string]: any;
  };

  private gi_url: string;
  
  private method_to_call;

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
    this.full_config = {
      base_url: base_url,
      username: username,
      password: password,
      tenant: tenant,
      branch: branch
    }
    
    this.auth = {
      name: username,
      password: password,
      tenant: tenant,
      branch: branch
    };
    
    this.basic_auth = {
      username: username,
      password: password
    };
    
    this.config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    this.gi_url = create_gi_url !== undefined ? create_gi_url(this.full_config) : `${this.full_config.base_url}/t/${this.full_config.tenant}/api/odata/gi/`;

    this.method_to_call = undefined;
  }

  // ---------------------------- ---------------------------- Private Static Helper Methods ---------------------------- ---------------------------- \\

  // ---------------------------- ---------------------------- Session Methods ---------------------------- ---------------------------- \\
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

      const cookies: string[] = (await axios.post(`${this.full_config.base_url}/entity/auth/login`, this.auth, this.config)).headers['set-cookie'];
      if (cookies) {
        this.config.headers['Cookie'] = cookies.join('; ');
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
      if (this.config.headers['Cookie']) await axios.post(`${this.full_config.base_url}/entity/auth/logout`, {}, this.config);

    } catch (error: any) {
      throw new Error(`Failed to login to Acumatica: ${error.response?.data?.exceptionMessage}`);

    } finally {
      delete this.config.headers['Cookie'];

    }
  }

  // ---------------------------- ---------------------------- HTTP Methods ---------------------------- ---------------------------- \\
  async get(url?: string | URL, odata_options?: QueryOptions): Promise<AcumaticaClient | AxiosResponse<any, any>> {
    if (url === undefined) {
      this.method_to_call = axios.get;
      return this;
    }
    
    if (url instanceof URL) url = url.href;
    
    if (!url.startsWith(this.full_config.base_url)) url = _http_join(this.full_config.base_url, url);

    url = odata_options.build(url);

    try {
      const config: AxiosRequestConfig<any> = {
        ...this.config,
        auth: this.basic_auth
      };

      return await axios.get(url, config);
    } catch (error: any) {
      throw error;

    }
  }

  async post(url?: string | URL, odata_options?: QueryOptions): Promise<AcumaticaClient | AxiosResponse<any, any>> {
    if (url === undefined) {
      this.method_to_call = axios.post;
      return this;
    }
    
    if (url instanceof URL) url = url.href;
    
    if (!url.startsWith(this.full_config.base_url)) url = _http_join(this.full_config.base_url, url);

    url = odata_options.build(url);

    try {
      const config: AxiosRequestConfig<any> = {
        ...this.config,
        auth: this.basic_auth
      };

      return await axios.post(url, config);
    } catch (error: any) {
      throw error;

    }
  }

  async put(url?: string| URL, odata_options?: QueryOptions): Promise<AcumaticaClient | AxiosResponse<any, any>> {
    if (url === undefined) {
      this.method_to_call = axios.put;
      return this;
    }
    
    if (url instanceof URL) url = url.href;
    
    if (!url.startsWith(this.full_config.base_url)) url = _http_join(this.full_config.base_url, url);

    url = odata_options.build(url);

    try {
      const config: AxiosRequestConfig<any> = {
        ...this.config,
        auth: this.basic_auth
      };

      return await axios.put(url, config);
    } catch (error: any) {
      throw error;

    }
  }

  async patch(url?: string | URL, odata_options?: QueryOptions): Promise<AcumaticaClient | AxiosResponse<any, any>> {
    if (url === undefined) {
      this.method_to_call = axios.patch;
      return this;
    }
    
    if (url instanceof URL) url = url.href;
    
    if (!url.startsWith(this.full_config.base_url)) url = _http_join(this.full_config.base_url, url);

    url = odata_options.build(url);

    try {
      const config: AxiosRequestConfig<any> = {
        ...this.config,
        auth: this.basic_auth
      };

      return await axios.patch(url, config);
    } catch (error: any) {
      throw error;

    }
  }

  async delete(url?: string | URL, odata_options?: QueryOptions): Promise<AcumaticaClient | AxiosResponse<any, any>> {
    if (url === undefined) {
      this.method_to_call = axios.delete;
      return this;
    }
    
    if (url instanceof URL) url = url.href;
    
    if (!url.startsWith(this.full_config.base_url)) url = _http_join(this.full_config.base_url, url);

    url = odata_options.build(url);

    try {
      const config: AxiosRequestConfig<any> = {
        ...this.config,
        auth: this.basic_auth
      };

      return await axios.delete(url, config);
    } catch (error: any) {
      throw error;

    }
  }

  async head(url?: string | URL, odata_options?: QueryOptions): Promise<AcumaticaClient | AxiosResponse<any, any>> {
    if (url === undefined) {
      this.method_to_call = axios.head;
      return this;
    }
    
    if (url instanceof URL) url = url.href;
    
    if (!url.startsWith(this.full_config.base_url)) url = _http_join(this.full_config.base_url, url);

    url = odata_options.build(url);

    try {
      const config: AxiosRequestConfig<any> = {
        ...this.config,
        auth: this.basic_auth
      };

      return await axios.head(url, config);
    } catch (error: any) {
      throw error;

    }
  }

  async options(url?: string | URL, odata_options?: QueryOptions): Promise<AcumaticaClient | AxiosResponse<any, any>> {
    if (url === undefined) {
      this.method_to_call = axios.options;
      return this;
    }
    
    if (url instanceof URL) url = url.href;
    
    if (!url.startsWith(this.full_config.base_url)) url = _http_join(this.full_config.base_url, url);

    url = odata_options.build(url);

    try {
      const config: AxiosRequestConfig<any> = {
        ...this.config,
        auth: this.basic_auth
      };

      return await axios.options(url, config);
    } catch (error: any) {
      throw error;

    }
  }

  async customers(version: string, odata_options?: QueryOptions, json_data?: object): Promise<AxiosResponse<any>> {
    let url: string = _http_join(this.full_config.base_url, "entity/Default", version, "Customer");
    url = odata_options !== undefined ? odata_options.build(url) : url;
    
    try {
      const config: AxiosRequestConfig<any> = {
        ...this.config,
        auth: this.basic_auth,
        data: json_data
      };

      return await this.method_to_call(url, config);
    } catch (error: any) {
      throw error;
    } 

    return;
  }

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
   * Unfortunately, neither of these field are searchable, only the `Inquiry Title` field is. So a manual seach is required.
   *
   * But, the `Inquiry Title` field is the inquiry title you need to pass into `@inquiry_title`.
   */
   async getFromGenericInquiry(inquiry_title: string, odata_options?: QueryOptions, create_gi_url?: (inquiry_title: string, config: AcumaticaConfig) => string): Promise<AxiosResponse<any, any>> {
    let url: string = create_gi_url !== undefined ? create_gi_url(inquiry_title, this.full_config) : `${this.gi_url}${inquiry_title}`;
    url = odata_options ? odata_options.build(url) : url;

    try {
      const config: AxiosRequestConfig<any> = {
        ...this.config,
        auth: this.basic_auth
      };
      
      return await axios.get(url, config);
      
    } catch (error) {
      throw error;
    }
  }
}

/**
 * Helper function to handle url joining.
 * 
 * @param { string[] } parts `string[]` The url parts. 
 * @returns { string } `string` The cleanly joined string.
 */
function _http_join(...parts: string[]): string {
  return '/' + parts.filter(Boolean).map(part => part.replace(/^\/+|\/+$/g, '')).join('/');
}