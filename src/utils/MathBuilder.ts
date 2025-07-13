import { NumberFieldFactory, AnyFieldFactory, StringFieldFactory } from "./Field";

/**
 * A non instantiable class meant to allow calls to OData Math Functions
 */
export class MathBuilder {
    public static round(expr: string | NumberFieldFactory): NumberFieldFactory {
        return `round(${expr})`;
    }

    public static floor(expr: string | NumberFieldFactory): NumberFieldFactory {
        return `floor(${expr})`;
    }

    public static ceil(expr: string | AnyFieldFactory | NumberFieldFactory): NumberFieldFactory {
        return `ceiling(${expr})`;
    }
}

MathBuilder.ceil(new StringFieldFactory(""))