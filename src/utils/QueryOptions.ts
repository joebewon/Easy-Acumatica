import { Filter } from './Filter'
import { QueryOptionsConfig } from "../types";

/**
 * A class to encapsulate the creation of OData Query Options.
 * 
 * Allows the type-safe creation of the HTTP Parameter Object
 * 
 * @TODO Add support for the `$custom` OData Query Option.
 * 
 * ***
 * ***
 * ### TSDoc of the `QueryOptionsConfig` Interface
 * @param { string | Filter } $filter `string | Filter` (Optional) A Filter object or a filter string that defines the OData filter. {@link https://help.acumatica.com/(W(5))/Help?ScreenId=ShowWiki&pageid=f279ec05-2f71-4376-a76f-d3ed0e0e2556 Acumatica Docs for $filter}.
 * @param { number } $top `number` (Optional) How many entries to return. Viz. only the first N entries will be returned. {@link https://help.acumatica.com/(W(5))/Help?ScreenId=ShowWiki&pageid=12ecc8c7-b0c0-4f26-bfe5-388be9674374 Acumatica Docs for $top}.
 * @param { number } $skip `number` (Optional) The number of rows to skip before getting data. {@link https://help.acumatica.com/(W(5))/Help?ScreenId=ShowWiki&pageid=be37b0cb-eb17-41c0-944c-d52f7a65cf2e Acumatica Docs for $skip}.
 * @param { string | string[] } $expand `string | string[]` (Optional) The list of linked and detail entities to expand. {@link https://help.acumatica.com/(W(5))/Help?ScreenId=ShowWiki&pageid=b6c2fecd-0b2e-4aba-9bad-4c5050befe25 Acumatica Docs for $expand}.
 * @param { string | string[] } $select `string | string[]` (Optional) The list of fields to return. {@link https://help.acumatica.com/(W(5))/Help?ScreenId=ShowWiki&pageid=ecbfdb12-4853-4ff5-b8c5-eade02f9b47b Acumatica Docs for $select}.
 * @param { string | [string, "asc" | "desc"][] } $orderby `string | [string, "asc" | "desc"][]` (Optional) The fields to order by. The Acumatica Devs seemed to missed this option when writing their docs. {@link https://www.odata.org/getting-started/basic-tutorial/#orderby OData Docs for $orderby}.
 */
export class QueryOptions {
    #_params: {
        $filter?: string;
        $top?: number;
        $skip?: number;
        $expand?: string;
        $select?: string;
        $orderby?: string;
    };

    /**
     * Constructor to create a `QueryOptions` Object.
     * 
     * See the TSDoc for `QueryOptionsConfig` for details on the parameters.
     * 
     * @param { QueryOptionsConfig } options `QueryOptionsConfig` An object literal containing the desired OData Query Options.
     * @throws `TypeError` When either `@options.$top` or `@options.$skip` are not integers. 
     */
    constructor(options: QueryOptionsConfig) {
        if (options.$top !== undefined && options.$skip !== undefined && (!Number.isInteger(options.$top) || !Number.isInteger(options.$skip))) {
            throw new TypeError("Both options.$top and options.$skip must be integers.");
        }
        
        this.#_params = {
            $filter: options.$filter?.toString(),
            $top: options.$top,
            $skip: options.$skip,
            $expand: typeof options.$expand === "string" ? options.$expand : options.$expand?.join(','),
            $select: typeof options.$select === "string" ? options.$select : options.$select?.join(','),
            $orderby: typeof options.$orderby === "string" ? options.$orderby : options.$orderby?.map((item) => item.join(' ')).join(',')
        };
    }

    /**
     * Returns a string representation of the QueryOptions instance.
     * 
     * @returns { string } `string` A string representation of the QueryOptions instance.
     */
    public toString(): string {
        return JSON.stringify(this.#_params, null, 2);
    }

    /**
     * Adds the query options stores in this instance to the provided URL.
     * 
     * @param { string } url `string` (Default: "") The base URL to which the query options will be appended.
     * @return { string } `string` The URL with the query options appended as a query string.
     */
    public build(url: string = ""): string {
        let param_list: string[] = [];
        for (let [key, value] of Object.entries(this.#_params)) {
            if (key !== undefined && value !== undefined) param_list.push(`${key}=${value}`);
        }

        return `${url}?${param_list.join('&')}`;
    }

    /**
     * Clears all parameters
     */
    public clear(): void {
        this.#_params = {
            $filter: undefined,
            $top: undefined,
            $skip: undefined,
            $expand: undefined,
            $select: undefined,
            $orderby: undefined
        }
    }

    // ------------------- ------------------- Getters and Setters ------------------- ------------------- \\
    // ------------------- $filter ------------------- \\
    /**
     * Gets the current `$filter` OData Query Option
     * 
     * @returns { string | undefined } `string | undefined` The filter string in the `$filter` OData Query Option.
     */
    public getFilter(): string | undefined {
        return this.#_params.$filter;
    }

    /**
     * Sets the `$filter` OData Query Option.
     * 
     * Functionality:
     * - If a string is passed, it will be used as the filter string. 
     * - If a `Filter` object is passed, it will be converted to a string using its `toString()` method.
     * - If `undefined` is passed (allows implicit passing of `undefined`), the `$filter` parameter will be cleared.
     * 
     * @param { string | Filter | undefined } flt `string | Filter | undefined` A Filter object defining the OData filter parameter or the filter string itself. {@link https://help.acumatica.com/(W(5))/Help?ScreenId=ShowWiki&pageid=f279ec05-2f71-4376-a76f-d3ed0e0e2556 Acumatica Docs for $filter}.
     */
    public setFilter(flt?: string | Filter | undefined): void {
        this.#_params.$filter = flt === undefined ? undefined : flt.toString();
    }

    /**
     * Deletes the `$filter` OData Query Option.
     * 
     * Alias for `setFilter(undefined)`.
     */
    public deleteFilter(): void {
        this.#_params.$filter = undefined;
    }

    /**
     * Gets the current `$top` OData Query Option.
     * 
     * @returns { number | undefined } `number | undefined` What is set in the `$top` OData Query Option.
     */
    public getTop(): number | undefined {
        return this.#_params.$top;
    }

    /**
     * Sets the `$top` OData Query Option.
     * 
     * Functionality:
     * - If a number is passed, it will be used as the value for the `$top` parameter.
     * - If `undefined` is passed (allows implicit passing of `undefined`), the `$top` parameter will be cleared.
     * 
     * @param { number | undefined } n `number | undefined` How many entries to return. Viz. only the first `@n` entries will be returned. {@link https://help.acumatica.com/(W(5))/Help?ScreenId=ShowWiki&pageid=12ecc8c7-b0c0-4f26-bfe5-388be9674374 Acumatica Docs for $top}.
     * @throws `TypeError` When `@n` is not an integer.
     */
    public setTop(n?: number | undefined): void {
        if (!Number.isInteger(n)) {
            throw new TypeError("Expected @n to be an integer.");
        }
        
        this.#_params.$top = n === undefined ? undefined : n;
    }

    /**
     * Deletes the `$top` OData Query Option.
     * 
     * Alias for `setTop(undefined)`.
     */
    public deleteTop(): void {
        this.#_params.$top = undefined;
    }

    /**
     * Gets the current `$skip` OData Query Option.
     * 
     * @returns { number | undefined } `number | undefined` What is set in the `$skip` OData Query Option.
     */
    public getSkip(): number | undefined {
        return this.#_params.$skip;
    }

    /**
     * Sets the `$top` OData Query Option.
     * 
     * Functionality:
     * - If a number is passed, it will be used as the value for the `$skip` parameter.
     * - If `undefined` is passed (allows implicit passing of `undefined`), the `$skip` parameter will be cleared.
     * 
     * @param { number | undefined } n `number | undefined` The number of rows to skip before getting data. {@link https://help.acumatica.com/(W(5))/Help?ScreenId=ShowWiki&pageid=be37b0cb-eb17-41c0-944c-d52f7a65cf2e Acumatica Docs for $skip}.
     * @throws `TypeError` When `@n` is not an integer.
     */
    public setSkip(n?: number | undefined): void {
        if (!Number.isInteger(n)) {
            throw new TypeError("Expected @n to be an integer.");
        }
        
        this.#_params.$skip = n === undefined ? undefined : n;
    }

    /**
     * Deletes the `$skip` OData Query Option.
     * 
     * Alias for `setSkip(undefined)`.
     */
    public deleteSkip(): void {
        this.#_params.$skip = undefined;
    }

    /**
     * Gets the current `$expand` OData Query Option.
     * 
     * @returns { string | undefined } `string | undefined` The list of expanded fields in the `$expand` OData Query Option.
     */
    public getExpand(): string | undefined {
        return this.#_params.$expand;
    }
    
    /**
     * Sets the `$expand` OData Query Option.
     * 
     * Functionality:
     * - If a string is passed, it will be used as the value for the `$expand` parameter.
     * - If an array of strings is passed, it will be joined with commas and used as the value for the `$expand` parameter.
     * - If `undefined` is passed (allows implicit passing of `undefined`), the `$expand` parameter will be cleared.
     * 
     * @param { string | string[] | undefined } list `string | string[] | undefined` The list of linked and detail entities to expand. {@link https://help.acumatica.com/(W(5))/Help?ScreenId=ShowWiki&pageid=b6c2fecd-0b2e-4aba-9bad-4c5050befe25 Acumatica Docs for $expand}.
     */
    public setExpand(list?: string | string[] | undefined): void  {
        if (list === undefined) {
            this.#_params.$expand = undefined;
            return;
        }

        this.#_params.$expand = typeof list === "string" ? list : list.join(',');
    }

    /**
     * Deletes the `$expand` OData Query Option.
     * 
     * Alias for `setExpand(undefined)`.
     */
    public deleteExpand(): void {
        this.#_params.$expand = undefined;
    }

    /**
     * Gets the current `$select` OData Query Option.
     * 
     * @returns { string | undefined } `string | undefined` The list of selected fields in the `$select` OData Query Option.
     */
    public getSelect(): string | undefined {
        return this.#_params.$select;
    }
    
    
    /**
     * Sets the `$select` OData Query Option.
     * 
     * Functionality:
     * - If a string is passed, it will be used as the value for the `$select` parameter.
     * - If an array of strings is passed, it will be joined with commas and used as the value for the `$select` parameter.
     * - If `undefined` is passed (allows implicit passing of `undefined`), the `$select` parameter will be cleared.
     * 
     * @param { string | string[] | undefined } list `string | string[] | undefined` The list of fields to return. {@link https://help.acumatica.com/(W(5))/Help?ScreenId=ShowWiki&pageid=ecbfdb12-4853-4ff5-b8c5-eade02f9b47b Acumatica Docs for $select}.
     */    
    public setSelect(list?: string | string[] | undefined): void  {
        if (list === undefined) {
            this.#_params.$select = undefined;
            return;
        }

        this.#_params.$select = typeof list === "string" ? list : list.join(',');
    }

    /**
     * Gets the current `$orderby` OData Query Option.
     * 
     * @returns { string | undefined } `string | undefined` The field that will be sorted and the sort direction.
     */
    public getOrderby(): string | undefined {
        return this.#_params.$orderby;
    }

    /**
     * Sets the `$orderby` ODdata Query Option
     * 
     * Functionality:
     * - If a string is passed, it will be used as the value for the `$orderby` parameter.
     * - If an array of arrays of two elements are passed, the first element will be used as the field to order by and the second element will be used as the sort direction ("asc" or "desc").
     * - If `undefined` is passed (allows implicit passing of `undefined`), the `$orderby` parameter will be cleared.
     * 
     * @param { string | [string, "asc" | "desc"][] } sort `string | [string, "asc" | "desc"]` The field to order by. The Acumatica Devs seemed to missed this option when writing their docs. {@link https://www.odata.org/getting-started/basic-tutorial/#orderby OData Docs for $orderby}.
     */
    public setOrderby(sort?: string | [string, "asc" | "desc"][] | undefined): void {
        if (sort === undefined) {
            this.#_params.$orderby = undefined;
            return;
        }

        this.#_params.$orderby = typeof sort === "string" ? sort : sort.map((item) => item.join(" ")).join(',');
    }

    /**
     * Deletes the `$orderby` OData Query Option.
     * 
     * Alias for `setOrderby(undefined)`.
     */
    public deleteOrderby(): void {
        this.#_params.$orderby = undefined;
    }
}