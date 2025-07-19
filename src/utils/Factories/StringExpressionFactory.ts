/**
 * @TODO - NOT IMPLEMENTED
 * 
 * A class to allow the easy creation of OData String Manipulation Expressions
 */
export class StringExpressionFactory {
    // -------------------- -------------------- String Functions -------------------- -------------------- \\
    public static substringOf(field: string, search_string: string | StringExpressionFactory): string {
        return `substringof(${StringExpressionFactory.lint_string(search_string)}, ${field})`;
    }

    public static startsWith(field: string, prefix: string | StringExpressionFactory): string {
        return `startswith(${field}, ${StringExpressionFactory.lint_string(prefix)})`;
    }
    
    public static endsWith(field: string, suffix: string | StringExpressionFactory): string {
        return `endswith(${field}, ${StringExpressionFactory.lint_string(suffix)})`;
    }

    // -------------------- -------------------- Private Helper Functions -------------------- -------------------- \\
    private static lint_string(val: any): string {
        if (typeof val !== "string" || val.startsWith("datetimeoffset") || val.startsWith("guid") || val.startsWith("cf.")) return val
        
        return `'${val.replaceAll("'", "\\'").replace('"', '\\"')}'`;
    }
}