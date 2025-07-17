import { NumberFieldFactory, AnyFieldFactory, StringFieldFactory } from "./Field";

/**
 * A non instantiable class meant to allow calls to OData Math Functions
 */
export class MathBuilder {
    public static round(expr: string | NumberFieldFactory): NumberFieldFactory {
        return new NumberFieldFactory(`round(${expr})`);
    }

    public static floor(expr: string | NumberFieldFactory): NumberFieldFactory {
        return new NumberFieldFactory(`floor(${expr})`);
    }

    public static ceil(expr: string | AnyFieldFactory | NumberFieldFactory): NumberFieldFactory {
        return new NumberFieldFactory(`ceiling(${expr})`);
    }
}