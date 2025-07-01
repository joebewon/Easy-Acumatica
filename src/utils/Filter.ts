import { DateBuilder } from "./DateBuilder";
import { FieldFactory } from "./FieldFactory";
import { MathBuilder } from "./MathBuilder";
import { StringBuilder } from "./StringBuilder";

export class Filter {
    #expr: string;
    static date = DateBuilder;
    static math = MathBuilder;
    static string = StringBuilder;

    constructor(expression: string, paramters?: any[]) {
        // Comparison Operators
        this.#expr = expression
            .replaceAll('<=', 'le')
            .replaceAll('<', 'lt')
            .replaceAll('>=', 'ge')
            .replaceAll('>', 'gt')
            .replaceAll('==', 'eq')
            .replaceAll('!=', 'ne');

        // Logical Operators
        this.#expr = this.#expr
            .replaceAll("&&", "and")
            .replaceAll("||", "or")
            .replaceAll("!", "not");

        // Mathmatical Operators
        this.#expr = this.#expr
            .replaceAll('+', 'add')
            .replaceAll('-', 'sub')
            .replaceAll('*', 'mul')
            .replaceAll('/', 'div')
            .replaceAll('%', 'mod')
    }

    toString(): string {
        return this.#expr;
    }

    // -------------------- -------------------- Functions -------------------- -------------------- \\
    field(field: string): FieldFactory {
        return new FieldFactory(field);
    }

    customField(): FieldFactory {
        return new FieldFactory("");
    }
}
