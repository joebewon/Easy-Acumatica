import { QueryOptionsConfig } from "../types";

export class QueryOptions {
    private params: {
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
            throw new Error("Both options.$top and options.$skip must be integers.");
        }
        
        this.params.$filter = options.$filter.toString();
        this.params.$top = options.$top;
        this.params.$skip = options.$skip;
        this.params.$expand = options.$expand?.join(',');
        this.params.$select = options.$select?.join(','); 
    }

    /**
     * Adds the query options stores in this instance to the provided URL.
     * 
     * @param { string } url `string` (Default: "") The base URL to which the query options will be appended.
     * @return { string } `string` The URL with the query options appended as a query string.
     */
    public build(url: string = ""): string {
        let param_list: string[] = [];
        for (let [key, value] of Object.entries(this.params)) {
            param_list.push(`${key}=${value}`);
        }

        return `${url}?${param_list.join('&')}`;
    }
}