import { DateFieldFactory, AnyFieldFactory, NumberFieldFactory } from "./FieldFactories"

/**
 * A non instanstiable container for OData v3 date functions.
 * 
 * All OData v3 date functions can be found as static methods on this class.
 */
export abstract class DateExpressionFactory {
    static #error_message: string = `The parameter @field must be of types string, AnyFieldFactory, or DateFieldFactory`;
    
    /**
     * Abstracts the OData `day()` function
     * ***
     * ***
     * OData Docs for `int day(DateTime $field_expr)`
     * ```ts
     * param { DateTime } $field_expr // A Field that is of type DateTime
     * returns { int } // The day number of the date within $field_expr
     * ```
     * 
     * OData Example
     * 
     * Suppose tha a value in the `BirthDate` corresponds to the date December 25, 2000 5:32:25
     * 
     * Then, in this case, `day(BirthDate)` would return 25.
     * ***
     * ***
     * @param { AnyFieldFactory | DateFieldFactory } field_expr `FieldFactory | DateTimeFieldFactory` The desired field or field expression as a FieldFactory object
     * @returns { NumberFieldFactory } `NumberFieldFactory` The OData day function
     * @throws `TypeError` When field is not of type `string | AnyFieldFactory | DateFieldFactory`
     */
    public static day(field_expr: AnyFieldFactory | DateFieldFactory): NumberFieldFactory;
    /**
     * Abstracts the OData `day()` function
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
     * Suppose tha a value in the `BirthDate` corresponds to the date December 25, 2000 5:32:25
     * 
     * Then, in this case, `day(BirthDate)` would return 25.
     * ***
     * ***
     * @param { string } field `string` The desired field or field expression as a string literal
     * @returns { string } `NumberFieldFactory` The OData day function
     * @throws `TypeError` When field is not of type `string | AnyFieldFactory | DateFieldFactory`
     */
    public static day(field: string): NumberFieldFactory;
    public static day(field: string | AnyFieldFactory | DateFieldFactory): NumberFieldFactory {
        if (typeof field !== 'string' && !(field instanceof AnyFieldFactory) && !(field instanceof DateFieldFactory)) throw new TypeError(DateExpressionFactory.#error_message);
        
        return new NumberFieldFactory(`day(${field})`);
    }

    // ------------------------------------------ ------------------------------------------ ------------------------------------------ ------------------------------------------ \\
    // ------------------------------------------ ------------------------------------------ ------------------------------------------ ------------------------------------------ \\
    // ------------------------------------------ ------------------------------------------ ------------------------------------------ ------------------------------------------ \\
    // ------------------------------------------ ------------------------------------------ ------------------------------------------ ------------------------------------------ \\
    // ------------------------------------------ ------------------------------------------ ------------------------------------------ ------------------------------------------ \\

    /**
     * Abstracts the OData `month()` function
     * ***
     * ***
     * OData Docs for `int month(DateTime $field_expr)`
     * ```ts
     * param { DateTime } $field_expr // A Field that is of type DateTime
     * returns { int } // The month number of the date within $field_expr
     * ```
     * 
     * OData Example
     * 
     * Suppose tha a value in the `BirthDate` corresponds to the date December 25, 2000 5:32:25
     * 
     * Then, in this case, `month(BirthDate)` would return 12.
     * ***
     * ***
     * @param { AnyFieldFactory | DateFieldFactory } field_expr `FieldFactory | DateTimeFieldFactory` The desired field or field expression as a FieldFactory object
     * @returns { NumberFieldFactory } `NumberFieldFactory` The OData month function
     * @throws `TypeError` When field is not of type `string | AnyFieldFactory | DateFieldFactory`
     */
    public static month(field_expr: AnyFieldFactory | DateFieldFactory): NumberFieldFactory;
    /**
     * Abstracts the OData `month()` function
     * ***
     * ***
     * OData Docs for `int month(DateTime $field)`
     * ```ts
     * param { DateTime } $field // A Field that is of type DateTime
     * returns { int } // The day number of the date within $field
     * ```
     * 
     * OData Example
     * 
     * Suppose tha a value in the `BirthDate` corresponds to the date December 25, 2000 5:32:25
     * 
     * Then, in this case, `month(BirthDate)` would return 12.
     * ***
     * ***
     * @param { string } field `string` The desired field or field expression as a string literal
     * @returns { string } `NumberFieldFactory` The OData month function
     * @throws `TypeError` When field is not of type `string | AnyFieldFactory | DateFieldFactory`
     */
    public static month(field: string): NumberFieldFactory;
    public static month(field: string | AnyFieldFactory | DateFieldFactory): NumberFieldFactory {
        if (typeof field !== 'string' && !(field instanceof AnyFieldFactory) && !(field instanceof DateFieldFactory)) throw new TypeError(DateExpressionFactory.#error_message);
        
        return new NumberFieldFactory(`month(${field})`);
    }
    
    // ------------------------------------------ ------------------------------------------ ------------------------------------------ ------------------------------------------ \\
    // ------------------------------------------ ------------------------------------------ ------------------------------------------ ------------------------------------------ \\
    // ------------------------------------------ ------------------------------------------ ------------------------------------------ ------------------------------------------ \\
    // ------------------------------------------ ------------------------------------------ ------------------------------------------ ------------------------------------------ \\
    // ------------------------------------------ ------------------------------------------ ------------------------------------------ ------------------------------------------ \\

    /**
     * Abstracts the OData `year()` function
     * ***
     * ***
     * OData Docs for `int year(DateTime $field_expr)`
     * ```ts
     * param { DateTime } $field_expr // A Field that is of type DateTime
     * returns { int } // The year number of the date within $field_expr
     * ```
     * 
     * OData Example
     * 
     * Suppose tha a value in the `BirthDate` corresponds to the date December 25, 2000 5:32:25
     * 
     * Then, in this case, `year(BirthDate)` would return 2000.
     * ***
     * ***
     * @param { AnyFieldFactory | DateFieldFactory } field_expr `FieldFactory | DateTimeFieldFactory` The desired field or field expression as a FieldFactory object
     * @returns { NumberFieldFactory } `NumberFieldFactory` The OData year function
     * @throws `TypeError` When field is not of type `string | AnyFieldFactory | DateFieldFactory`
     */
    public static year(field_expr: AnyFieldFactory | DateFieldFactory): NumberFieldFactory;
    /**
     * Abstracts the OData `year()` function
     * ***
     * ***
     * OData Docs for `int year(DateTime $field)`
     * ```ts
     * param { DateTime } $field // A Field that is of type DateTime
     * returns { int } // The year number of the date within $field
     * ```
     * 
     * OData Example
     * 
     * Suppose tha a value in the `BirthDate` corresponds to the date December 25, 2000 5:32:25
     * 
     * Then, in this case, `year(BirthDate)` would return 2000.
     * ***
     * ***
     * @param { string } field `string` The desired field or field expression as a string literal
     * @returns { string } `NumberFieldFactory` The OData year function
     * @throws `TypeError` When field is not of type `string | AnyFieldFactory | DateFieldFactory`
     */
    public static year(field: string): NumberFieldFactory;
    public static year(field: string | AnyFieldFactory | DateFieldFactory): NumberFieldFactory {
        if (typeof field !== 'string' && !(field instanceof AnyFieldFactory) && !(field instanceof DateFieldFactory)) throw new TypeError(DateExpressionFactory.#error_message);
        
        return new NumberFieldFactory(`year(${field})`);
    }
    
    // ------------------------------------------ ------------------------------------------ ------------------------------------------ ------------------------------------------ \\
    // ------------------------------------------ ------------------------------------------ ------------------------------------------ ------------------------------------------ \\
    // ------------------------------------------ ------------------------------------------ ------------------------------------------ ------------------------------------------ \\
    // ------------------------------------------ ------------------------------------------ ------------------------------------------ ------------------------------------------ \\
    // ------------------------------------------ ------------------------------------------ ------------------------------------------ ------------------------------------------ \\
    
    /**
     * Abstracts the OData `hour()` function
     * ***
     * ***
     * OData Docs for `int hour(DateTime $field_expr)`
     * ```ts
     * param { DateTime } $field_expr // A Field that is of type DateTime
     * returns { int } // The hours value of the date within $field_expr
     * ```
     * 
     * OData Example
     * 
     * Suppose tha a value in the `BirthDate` corresponds to the date December 25, 2000 5:32:25
     * 
     * Then, in this case, `hour(BirthDate)` would return 5.
     * ***
     * ***
     * @param { AnyFieldFactory | DateFieldFactory } field_expr `FieldFactory | DateTimeFieldFactory` The desired field or field expression as a FieldFactory object
     * @returns { NumberFieldFactory } `NumberFieldFactory` The OData hour function
     * @throws `TypeError` When field is not of type `string | AnyFieldFactory | DateFieldFactory`
     */
    public static hour(field_expr: AnyFieldFactory | DateFieldFactory): NumberFieldFactory;
    /**
     * Abstracts the OData `hour()` function
     * ***
     * ***
     * OData Docs for `int hour(DateTime $field)`
     * ```ts
     * param { DateTime } $field // A Field that is of type DateTime
     * returns { int } // The hours value of the date within $field
     * ```
     * 
     * OData Example
     * 
     * Suppose tha a value in the `BirthDate` corresponds to the date December 25, 2000 5:32:25
     * 
     * Then, in this case, `hour(BirthDate)` would return 5.
     * ***
     * ***
     * @param { string } field `string` The desired field or field expression as a string literal
     * @returns { string } `NumberFieldFactory` The OData hour function
     * @throws `TypeError` When field is not of type `string | AnyFieldFactory | DateFieldFactory`
     */
    public static hour(field: string): NumberFieldFactory;
    public static hour(field: string | AnyFieldFactory | DateFieldFactory): NumberFieldFactory {
        if (typeof field !== 'string' && !(field instanceof AnyFieldFactory) && !(field instanceof DateFieldFactory)) throw new TypeError(DateExpressionFactory.#error_message);
        
        return new NumberFieldFactory(`hour(${field})`);
    }
    
    // ------------------------------------------ ------------------------------------------ ------------------------------------------ ------------------------------------------ \\
    // ------------------------------------------ ------------------------------------------ ------------------------------------------ ------------------------------------------ \\
    // ------------------------------------------ ------------------------------------------ ------------------------------------------ ------------------------------------------ \\
    // ------------------------------------------ ------------------------------------------ ------------------------------------------ ------------------------------------------ \\
    // ------------------------------------------ ------------------------------------------ ------------------------------------------ ------------------------------------------ \\

    /**
     * Abstracts the OData `minute()` function
     * ***
     * ***
     * OData Docs for `int minute(DateTime $field_expr)`
     * ```ts
     * param { DateTime } $field_expr // A Field that is of type DateTime
     * returns { int } // The minutes value of the date within $field_expr
     * ```
     * 
     * OData Example
     * 
     * Suppose tha a value in the `BirthDate` corresponds to the date December 25, 2000 5:32:25
     * 
     * Then, in this case, `minute(BirthDate)` would return 32.
     * ***
     * ***
     * @param { AnyFieldFactory | DateFieldFactory } field_expr `FieldFactory | DateTimeFieldFactory` The desired field or field expression as a FieldFactory object
     * @returns { NumberFieldFactory } `NumberFieldFactory` The OData minute function
     * @throws `TypeError` When field is not of type `string | AnyFieldFactory | DateFieldFactory`
     */
    public static minute(field_expr: AnyFieldFactory | DateFieldFactory): NumberFieldFactory;
    /**
     * Abstracts the OData `minute()` function
     * ***
     * ***
     * OData Docs for `int minute(DateTime $field)`
     * ```ts
     * param { DateTime } $field // A Field that is of type DateTime
     * returns { int } // The minutes value of the date within $field
     * ```
     * 
     * OData Example
     * 
     * Suppose tha a value in the `BirthDate` corresponds to the date December 25, 2000 5:32:25
     * 
     * Then, in this case, `minute(BirthDate)` would return 32.
     * ***
     * ***
     * @param { string } field `string` The desired field or field expression as a string literal
     * @returns { string } `NumberFieldFactory` The OData minute function
     * @throws `TypeError` When field is not of type `string | AnyFieldFactory | DateFieldFactory`
     */
    public static minute(field: string): NumberFieldFactory;
    public static minute(field: string | AnyFieldFactory | DateFieldFactory): NumberFieldFactory {
        if (typeof field !== 'string' && !(field instanceof AnyFieldFactory) && !(field instanceof DateFieldFactory)) throw new TypeError(DateExpressionFactory.#error_message);

        return new NumberFieldFactory(`minute(${field})`);
    }
    
    // ------------------------------------------ ------------------------------------------ ------------------------------------------ ------------------------------------------ \\
    // ------------------------------------------ ------------------------------------------ ------------------------------------------ ------------------------------------------ \\
    // ------------------------------------------ ------------------------------------------ ------------------------------------------ ------------------------------------------ \\
    // ------------------------------------------ ------------------------------------------ ------------------------------------------ ------------------------------------------ \\
    // ------------------------------------------ ------------------------------------------ ------------------------------------------ ------------------------------------------ \\

    /**
     * Abstracts the OData `second()` function
     * ***
     * ***
     * OData Docs for `int second(DateTime $field_expr)`
     * ```ts
     * param { DateTime } $field_expr // A Field that is of type DateTime
     * returns { int } // The seconds value of the date within $field_expr
     * ```
     * 
     * OData Example
     * 
     * Suppose tha a value in the `BirthDate` corresponds to the date December 25, 2000 5:32:25
     * 
     * Then, in this case, `second(BirthDate)` would return 25.
     * ***
     * ***
     * @param { AnyFieldFactory | DateFieldFactory } field_expr `FieldFactory | DateTimeFieldFactory` The desired field or field expression as a FieldFactory object
     * @returns { NumberFieldFactory } `NumberFieldFactory` The OData second function
     * @throws `TypeError` When field is not of type `string | AnyFieldFactory | DateFieldFactory`
     */
    public static second(field_expr: AnyFieldFactory | DateFieldFactory): NumberFieldFactory;
    /**
     * Abstracts the OData `second()` function
     * ***
     * ***
     * OData Docs for `int second(DateTime $field)`
     * ```ts
     * param { DateTime } $field // A Field that is of type DateTime
     * returns { int } // The seconds value of the date within $field
     * ```
     * 
     * OData Example
     * 
     * Suppose tha a value in the `BirthDate` corresponds to the date December 25, 2000 5:32:25
     * 
     * Then, in this case, `second(BirthDate)` would return 25.
     * ***
     * ***
     * @param { string } field `string` The desired field or field expression as a string literal
     * @returns { string } `NumberFieldFactory` The OData second function
     * @throws `TypeError` When field is not of type `string | AnyFieldFactory | DateFieldFactory`
     */
    public static second(field: string): NumberFieldFactory;
    public static second(field: string | AnyFieldFactory | DateFieldFactory): NumberFieldFactory {
        if (typeof field !== 'string' && !(field instanceof AnyFieldFactory) && !(field instanceof DateFieldFactory)) throw new TypeError(DateExpressionFactory.#error_message);

        return new NumberFieldFactory(`second(${field})`);
    }
}