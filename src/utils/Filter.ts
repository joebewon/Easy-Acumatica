import { DateBuilder } from "./DateBuilder";
import { AnyFieldFactory } from "./Field";
import { MathBuilder } from "./MathBuilder";
import { StringBuilder } from "./StringBuilder";

export class Filter {
    #expr: string;
    static date = DateBuilder;
    static math = MathBuilder;
    static string = StringBuilder;

    /**
     * The Main Filter Creator.
     * 
     * @precondition ALL operators (except `!`) MUST be surrounded by two whitespaces. This is a necessity to keep everything consitant internally.
     * 
     * @param { string } expression `string` The main filter expression. Everything funnels into this expression.
     * @param { (string | number | Date)[] } values `(string | number | Date)[]` (Optional) A parameterized array of values to filter for.
     * @param { (string | AnyFieldFactory)[] } fields `(string | FieldFactory)[]` (Optional) A paramerterized array of fields to filter in.\
     * @example
     * ```ts
     * // flt.toString() returns: `Field1 == 'A String Value' && (day(Field2) > 0 || Field2 != '2025-07-12T23:32:33.495Z')`
     * const flt: Filter = new Filter(
     *      '$f1 == $v1 && ($f2 > $v2 || $f3 != $v3)'
     *      ["A String Value", 0, new Date('2025-07-12T23:32:33.495Z')],
     *      ["Field1", Filter.field("Field2").day(), "Field2"]
     * );
     * ```
     * ***
     * ***
     * # The Filter Class
     * ## Standard Notation to OData Syntax Conversion
     * Given the contraints of urls, the creators of the OData standard had to deviate away from standard logical and mathmatical notation.
     * 
     * To alleviate the pressure of learning a new standard, and to make use of this package cleaner, this converts the predicate expression from standard notation that we as programmers are familiar with, to OData syntax.
     * 
     * ### Notation Conversion Reference
     * 
     * | Standard Notation | OData Syntax | Description |
     * |-------------------|--------------|:-------------|
     * | `<=` | `le` | Less Than or Equal To 
     * | `<` | `lt` | Less than
     * | `>=` | `ge` | Greater Than or Equal To
     * | `>` | `gt` | Greater Than
     * | `==` | `eq` | Equal To
     * | `!=` | `ne` | Not Equal To
     * | `&&` | `and` | Logical And
     * | `\|\|` | `or` | Logical Or
     * | `!` | `not` | Logical Not
     * | `+` | `add` | Mathmatical Addition
     * | `-` | `sub` | Mathmatical Subtraction
     * | `*` | `mul` | Mathmatical Multiplaction
     * | `/` | `div` | Mathmatical Division
     * | `%` | `mod` | Mathmatical Modulo
     * 
     * @precondition To use these, ALL operators (except `!`) MUST be surrounded by two whitespaces. This is a necessity to keep everything consitant internally.
     * 
     * In the case of the `!` operator, a single white space must preceed it, and it must be directly up against the predicate it is negating.
     * 
     * @example
     * ```
     * ```
     * ***
     * ***
     * ## Parameterization
     * 
     * Although passing in the exact OData string, is supported, it is preferred to paramerterize the values.
     * 
     * In out case this constructor allows the paramerterize of both the field names/functions on them and the values.
     * 
     * There are used like by use `$v#` and `$f#` notations for values and fields respectively, such that `#` corresponds exactly with the 1 + index of the item within the `@values` and `@fields` parameters.
     * 
     * @example
     * ```ts
     * // flt.toString() returns: `Field1 == 'A String Value' && (day(Field2) > 0 || Field2 != '2025-07-12T23:32:33.495Z')`
     * const flt: Filter = new Filter(
     *      '$f1 == $v1 && ($f2 > $v2 || $f3 != $v3)'
     *      ["A String Value", 0, new Date('2025-07-12T23:32:33.495Z')],
     *      ["Field1", Filter.field("Field2").day(), "Field2"]
     * );
     * ```
     * 
     * However, if only one of arrays is passed in, you may omit the letter identifier. This works regardles of which array is given and which is not.
     * 
     * @example
     * ```ts
     * // flt.toString() returns: `Field1 == 'A String Value' && (day(Field2) > 0 || Field2 != '2025-07-12T23:32:33.495Z')`
     * const flt: Filter = new Filter(
     *      'Field1 == $1 && (day(Field2) > $2 || Field2 != $3)',
     *      ["A String Value", 0, new Date('2025-07-12T23:32:33.495Z')]
     * );
     * ```
     */
    constructor(expression: string, values?: (string | number | Date)[], fields?: (string | AnyFieldFactory)[]) {
        // Comparison Operators
        this.#expr = expression
            .replaceAll(' <= ', ' le ')
            .replaceAll(' < ', ' lt ')
            .replaceAll(' >= ', ' ge ')
            .replaceAll(' > ', ' gt ')
            .replaceAll(' == ', ' eq ')
            .replaceAll(' != ', ' ne ');

        // Logical Operators
        this.#expr = this.#expr
            .replaceAll(" && ", " and ")
            .replaceAll(" || ", " or ")
            .replaceAll(" !", " not ");

        // Mathmatical Operators
        this.#expr = this.#expr
            .replaceAll(' + ', ' add ')
            .replaceAll(' - ', ' sub ')
            .replaceAll(' * ', ' mul ')
            .replaceAll(' / ', ' div ')
            .replaceAll(' % ', ' mod ');

        // Value replacements

        // Field Replacements
    }

    toString(): string {
        return this.#expr;
    }

    // -------------------- -------------------- Functions -------------------- -------------------- \\
    static field(field: string): AnyFieldFactory {
        return new AnyFieldFactory(field);
    }

    static customField(): AnyFieldFactory {
        return new AnyFieldFactory("");
    }
}

const flt: Filter = new Filter(`${Filter.field("InventoryID").subField("Qty")} + 5 == ${Filter.date.day()}`);

console.log(flt.toString());