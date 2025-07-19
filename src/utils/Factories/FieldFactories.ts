// @TODO - Fix subField -> It is type agnostic at the moment

export class FieldFactory {
    #expr: string;

    constructor(field_name: string) {
        this.#expr = field_name;
    }

    subField(sub_field: string): FieldFactory {
        this.#expr += `/${sub_field}`;

        return this;
    }

    toString(): string {
        return this.#expr;
    }
}

export class AnyFieldFactory extends FieldFactory {
    /**
     * @readonly
     * 
     * Branding Variable
     * 
     * Used by TypeScript to prevent coersion to any of its sibling classes at compile time.
     * 
     * When transcompiled to JavaScript, functions will prevent coersion at runtime via `instanceof`, throwing a `TypeError`. See each function for details.
     */
    readonly __type: 'any' = 'any';
    
    constructor(field_name: string) {
        super(field_name);
    }
}

/**
 * @class
 * 
 * Instances of this `BooleanFieldFactory` represent fields that are of the boolean type, or expressions on a field that return a boolean type.
 * 
 * @example
 * ```ts
 * // endswith(CustomerName, 'Smith')
 * // ------------------------------------
 * // This odata expression would be contained within a `BooleanFieldFactory` as the OData `endswith` returns a boolean.
 * // In addition, the `full_name` would be of type `StringFieldFactory` as it is a field that contains string values.
 * // Below is how this expression could be implemented in easy-acumatica.
 * // For the sake of this example, suppose that `CustomerName` is a string field in Acumatica.
 * const customer_name_field: StringFieldFactory = new StringFieldfactory('CustomerName');
 * const expr: BooleanFieldFactory = new StringBuilder.endswith(customer_name_field);
 * ```
 */
export class BooleanFieldFactory extends FieldFactory {
    /**
     * @readonly
     * 
     * Branding Variable
     * 
     * Used by TypeScript to prevent coersion to any of its sibling classes at compile time.
     * 
     * When transcompiled to JavaScript, functions will prevent coersion at runtime via `instanceof`, throwing a `TypeError`. See each function for details.
     */
    readonly __type: 'boolean' = 'boolean';
    
    constructor(field_name: string) {
        super(field_name);
    }
}

export class NumberFieldFactory extends FieldFactory {
    /**
     * @readonly
     * 
     * Branding Variable
     * 
     * Used by TypeScript to prevent coersion to any of its sibling classes at compile time.
     * 
     * When transcompiled to JavaScript, functions will prevent coersion at runtime via `instanceof`, throwing a `TypeError`. See each function for details.
     */
    readonly __type: 'number' = 'number';
    
    constructor(field_name: string) {
        super(field_name);
    }
}

export class StringFieldFactory extends FieldFactory {
    /**
     * @readonly
     * 
     * Branding Variable
     * 
     * Used by TypeScript to prevent coersion to any of its sibling classes at compile time.
     * 
     * When transcompiled to JavaScript, functions will prevent coersion at runtime via `instanceof`, throwing a `TypeError`. See each function for details.
     */    
    readonly __type: 'string' = 'string';
    
    constructor(field_name: string) {
        super(field_name);
    }
}

/**
 * @class
 * 
 * Instances of this `DateFieldFactory` represent fields that are of the DateTime type, or expressions on a field that return a DateTime type.
 * 
 * @example
 * ```ts
 * // year(BirthDate)
 * // ------------------------------------
 * // This odata expression is using a DateTime Field as its paramter, while returing a integer.
 * // In addition, this expression would be represented as a NumberFieldFactory in easy-acumatica
 * // Below is how this expression could be implemented in easy-acumatica.
 * // For the sake of this example, suppose that `BirthDate` is a DateTime field in Acumatica.
 * const birthdate_field: DateFieldFactory = new DateFieldFactory('BirthDate');
 * const expr: NumberFieldFactory = new DateExpressionFactory.year(birthdate_field);
 * ```
 */
export class DateFieldFactory extends FieldFactory {
    /**
     * @readonly
     * 
     * Branding Variable
     * 
     * Used by TypeScript to prevent coersion to any of its sibling classes at compile time.
     * 
     * When transcompiled to JavaScript, functions will prevent coersion at runtime via `instanceof`, throwing a `TypeError`. See each function for details.
     */    
    readonly __type: 'datetime' = 'datetime';
    
    constructor(field_name: string) {
        super(field_name);
    }
}