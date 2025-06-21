import { Filter } from './Filter'
import { QueryOptionsConfig } from "../types";

/**
 * A class to encapsulate the OData Query Parameters
 */
export class QueryOptions {
    #_params: {
        $filter?: string;
        $top?: number;
        $skip?: number;
        $expand?: string;
        $select?: string;
    };

    /**
     * @param options `QueryOptionsConfig` An object literal containing the desired OData Query Parameters.
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
            $select: typeof options.$select === "string" ? options.$select : options.$select?.join(',')
        };
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

    // ------------------- ------------------- Getters and Setters ------------------- ------------------- \\
    // ------------------- $filter ------------------- \\
    
    public getFilter(): string | undefined {
        return this.#_params.$filter;
    }

    /**
     * Sets the `$filter` query parameter.
     * 
     * @param { string | Filter } flt `string | Filter` A Filter object defining the OData filter paramter or the filter string itself. {@link https://help.acumatica.com/(W(5))/Help?ScreenId=ShowWiki&pageid=f279ec05-2f71-4376-a76f-d3ed0e0e2556 Acumatica Docs for $filter}.
     */
    public setFilter(flt: string | Filter): void {
        this.#_params.$filter = flt.toString();
    }

    /**
     * Getter for `$top`.
     * 
     * @returns `number` What is set in the `$top` query paramter.
     */
    public getTop(): number {
        return this.#_params.$top;
    }

    /**
     * Sets the `$top` query parameter.
     * 
     * @param { number } n `number` How many entries to return. Viz. only the first `@n` entries will be returned. {@link https://help.acumatica.com/(W(5))/Help?ScreenId=ShowWiki&pageid=12ecc8c7-b0c0-4f26-bfe5-388be9674374 Acumatica Docs for $top}.
     * @throws `TypeError` When `@n` is not an integer.
     */
    public setTop(n: number): void {
        if (!Number.isInteger(n)) {
            throw new TypeError("Expected @n to be an integer.");
        }
        
        this.#_params.$top = n;
    }

    /**
     * Getter for `$skip`.
     * 
     * @returns `number` What is set in the `$skip` query paramter.
     */
    public getSkip(): number {
        return this.#_params.$skip;
    }

    /**
     * Sets the `$top` query parameter.
     * 
     * @param { number } n `number` The number of rows to skip before getting data. {@link https://help.acumatica.com/(W(5))/Help?ScreenId=ShowWiki&pageid=be37b0cb-eb17-41c0-944c-d52f7a65cf2e Acumatica Docs for $skip}.
     * @throws `TypeError` When `@n` is not an integer.
     */
    public setSkip(n: number): void {
        if (!Number.isInteger(n)) {
            throw new TypeError("Expected @n to be an integer.");
        }
        
        this.#_params.$skip = n;
    }
}