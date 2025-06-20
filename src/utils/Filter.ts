import { MathBuilder } from "./MathBuilder";
import { StringBuilder } from "./StringBuilder";

export class Filter {
    public expr: string;

    constructor(expression) {
        this.expr = expression;
    }
    toString(): string {
        return this.expr;
    }

    // -------------------- -------------------- Comparison Operators -------------------- -------------------- \\
    private static c_op(op: string, p: string | String | MathBuilder | StringBuilder, q: string | String | MathBuilder | StringBuilder): Filter {
        return new Filter(`${p} ${op} ${Filter.lint_string(q)}`)
    }
    
    public static eq(p: string | MathBuilder | StringBuilder, q: string | String | MathBuilder | StringBuilder): Filter {
        return Filter.c_op("eq", p, q);
    }
    
    public static ne(p: string | String | MathBuilder | StringBuilder, q: string | String | MathBuilder | StringBuilder): Filter {
        return Filter.c_op("ne", p, q);
    }

    public static gt(p: string | String | MathBuilder | StringBuilder, q: string | String | MathBuilder | StringBuilder): Filter {
        return Filter.c_op("gt", p, q);
    }

    public static ge(p: string | String | MathBuilder | StringBuilder, q: string | String | MathBuilder | StringBuilder): Filter {
        return Filter.c_op("ge", p, q);
    }

    public static lt(p: string | String | MathBuilder | StringBuilder, q: string | String | MathBuilder | StringBuilder): Filter {
        return Filter.c_op("lt", p, q);
    }

    public static le(p: string | String | MathBuilder | StringBuilder, q: string | String | MathBuilder | StringBuilder): Filter {
        return Filter.c_op("le", p, q);
    }
    
    // -------------------- -------------------- Logic Operators -------------------- -------------------- \\

    public and(other: Filter): Filter {
        return new Filter(`(${this.expr} and ${other.expr})`);
    }
    
    public or(other: Filter): Filter {
        return new Filter(`(${this.expr} or ${other.expr})`);
    }
    
    static not(other: Filter): Filter {
        return new Filter(`not (${other.expr})`);
    }
    
    // -------------------- -------------------- String Functions -------------------- -------------------- \\
    public static substringOf(field: string, search_string: string | StringBuilder): Filter {
        return new Filter(`substringof(${Filter.lint_string(search_string)}, ${field})`)
    }

    public static startsWith(field: string, prefix: string | StringBuilder): Filter {
        return new Filter(`startswith(${field}, ${Filter.lint_string(prefix)})`)
    }
    
    public static endsWith(field: string, suffix: string | StringBuilder): Filter {
        return new Filter(`endswith(${field}, ${Filter.lint_string(suffix)})`)
    }

    // -------------------- -------------------- Private Helper Functions -------------------- -------------------- \\
    private static lint_string(val: any): string {
        if (typeof val !== "string" || val.startsWith("datetimeoffset") || val.startsWith("guid") || val.startsWith("cf.")) return val
        
        return `'${val.replaceAll("'", "\\'").replace('"', '\\"')}'`;
    }   
}
