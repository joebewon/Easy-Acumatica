/**
 * A non instantiable class meant to allow calls to OData Math Functions
 */
export class MathBuilder {
    public static round(expr: string): string {
        return `round(${expr})`;
    }

    public static floor(expr: string): string {
        return `floor(${expr})`;
    }

    public static ceil(expr: string): string {
        return `ceiling(${expr})`;
    }
}