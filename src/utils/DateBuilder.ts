import { FieldFactory } from "./FieldFactory"

export class DateBuilder {

    /**
     * Abstracts the OData `day` function
     * ***
     * ***
     * OData Docs for `int day(DateTime $field)`
     * ```ts
     * param { DateTime } $field // A Field that is of type DateTime
     * returns { int } // The day number of the date within $field
     * ```
     * 
     * OData Example
     * 
     * Say that a value in the `BirthDate` corresponds to the date December 25, 2000 5:32:25
     * 
     * Then `day(BirthDate)` would return 25, in this case.
     * ***
     * ***
     * @param { FieldFactory } field `FieldFactory` The desired field as a FieldFactory object
     * @returns { string } `string` The OData day function
     */
    public static day(field: FieldFactory): string;
    /**
     * Abstracts the OData `day` function
     * ***
     * ***
     * OData Docs for `int day(DateTime $field)`
     * ```ts
     * param { DateTime } $field // A Field that is of type DateTime
     * returns { int } // The day number of the date within $field
     * ```
     * 
     * OData Example
     * 
     * Say that a value in the `BirthDate` corresponds to the date December 25, 2000 5:32:25
     * 
     * Then `day(BirthDate)` would return 25, in this case.
     * ***
     * ***
     * @param { string } field `string` The desired Field as a string literal
     * @returns { string } `string` The OData day function
     */
    public static day(field: string ): string;
    public static day(field: string | FieldFactory): string {
        return `day(${field})`
    }

    // ------------------------------------------ \\
    public static month(field: string): string {
        return `month(${field})`
    }
    
    // ------------------------------------------ \\
    public static year(field: string): string {
        return `year(${field})`
    }
    
    // ------------------------------------------ \\
    public static hour(field: string): string {
        return `hour(${field})`
    }
    
    // ------------------------------------------ \\
    public static minute(field: string): string {
        return `minute(${field})`
    }
    
    // ------------------------------------------ \\
    public static second(field: string): string {
        return `second(${field})`
    }
}