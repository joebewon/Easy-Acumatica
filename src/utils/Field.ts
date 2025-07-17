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