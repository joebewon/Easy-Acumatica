import { Filter } from "../utils";

/**
 * @param { string } base_url `string` Base URL of the Acumatica instance.
 * @param { string } username `string` Username for authentication.
 * @param { string } password `string` Password for authentication.
 * @param { string } tenant `string` Tenant name.
 * @param { string } branch `string` (Optional) Branch name.
 */
export type AcumaticaConfig = {
    base_url: string;
    username: string;
    password: string;
    tenant: string;
    branch?: string;
}

export type QueryOptionsConfig = {
    $filter?: Filter;
    $top?: number;
    $skip?: number;
    $expand?: string[];
    $select?: string[];
}