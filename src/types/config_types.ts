import { Filter } from "../utils";

/**
 * An AcuamticaConfig Interface
 * 
 * Defines what exactly an EasyAcumatica instance has access to.
 * 
 * @param { string } base_url `string` Base URL of the Acumatica instance.
 * @param { string } username `string` Acumatica Username for authentication.
 * @param { string } password `string` Acumatica Password for authentication.
 * @param { string } tenant `string` Tenant name.
 * @param { string } branch `string` (Optional) Branch name.
 */
export interface AcumaticaConfig {
    /** Base URL of the Acumatica instance. */
    base_url: string;

    /** Username for authentication. */
    username: string;

    /** Password for authentication. */
    password: string;

    /** Tenant Name */
    tenant: string;

    /** (Optional) Branch name. */
    branch?: string;
}
/**
 * An interface for the object passed into the QueryOptions constructor.
 * 
 * @param { string | Filter } $filter `string | Filter` (Optional) A Filter object or a filter string that defines the OData filter. {@link https://help.acumatica.com/(W(5))/Help?ScreenId=ShowWiki&pageid=f279ec05-2f71-4376-a76f-d3ed0e0e2556 Acumatica Docs for $filter}.
 * @param { number } $top `number` (Optional) How many entries to return. Viz. only the first N entries will be returned. {@link https://help.acumatica.com/(W(5))/Help?ScreenId=ShowWiki&pageid=12ecc8c7-b0c0-4f26-bfe5-388be9674374 Acumatica Docs for $top}.
 * @param { number } $skip `number` (Optional) The number of rows to skip before getting data. {@link https://help.acumatica.com/(W(5))/Help?ScreenId=ShowWiki&pageid=be37b0cb-eb17-41c0-944c-d52f7a65cf2e Acumatica Docs for $skip}.
 * @param { string | string[] } $expand `string | string[]` (Optional) The list of linked and detail entities to expand. {@link https://help.acumatica.com/(W(5))/Help?ScreenId=ShowWiki&pageid=b6c2fecd-0b2e-4aba-9bad-4c5050befe25 Acumatica Docs for $expand}.
 * @param { string | string[] } $select `string | string[]` (Optional) The list of fields to return. {@link https://help.acumatica.com/(W(5))/Help?ScreenId=ShowWiki&pageid=ecbfdb12-4853-4ff5-b8c5-eade02f9b47b Acumatica Docs for $select}.
 * @param { string | [string, "asc" | "desc"] } $orderby `string | [string, "asc" | "desc"]` (Optional) The field to order by. The Acumatica Devs seemed to missed this option when writing their docs. {@link https://www.odata.org/getting-started/basic-tutorial/#orderby OData Docs for $orderby}.
 */
export interface QueryOptionsConfig {
    /** (Optional) A Filter object or a filter string that defines the OData filter. {@link https://help.acumatica.com/(W(5))/Help?ScreenId=ShowWiki&pageid=f279ec05-2f71-4376-a76f-d3ed0e0e2556 Acumatica Docs for $filter}. */
    $filter?: string | Filter;
    
    /** (Optional) How many entries to return. Viz. only the first N entries will be returned. {@link https://help.acumatica.com/(W(5))/Help?ScreenId=ShowWiki&pageid=12ecc8c7-b0c0-4f26-bfe5-388be9674374 Acumatica Docs for $top}. */
    $top?: number;
    
    /** (Optional) The number of rows to skip before getting data. {@link https://help.acumatica.com/(W(5))/Help?ScreenId=ShowWiki&pageid=be37b0cb-eb17-41c0-944c-d52f7a65cf2e Acumatica Docs for $skip}. */
    $skip?: number;
    
    /** (Optional) The list of linked and detail entities to expand. {@link https://help.acumatica.com/(W(5))/Help?ScreenId=ShowWiki&pageid=b6c2fecd-0b2e-4aba-9bad-4c5050befe25 Acumatica Docs for $expand}. */
    $expand?: string | string[];
    
    /** (Optional) The list of fields to return. {@link https://help.acumatica.com/(W(5))/Help?ScreenId=ShowWiki&pageid=ecbfdb12-4853-4ff5-b8c5-eade02f9b47b Acumatica Docs for $select}. */
    $select?: string | string[];

    /** (Optional) The field to order by. The Acumatica Devs seemed to missed this option when writing their docs. {@link https://www.odata.org/getting-started/basic-tutorial/#orderby OData Docs for $orderby}. */
    $orderby?: string | [string, "asc" | "desc"];
}