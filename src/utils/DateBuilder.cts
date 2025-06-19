export class DateBuilder {
    public static day(field: string): string {
        return `day(${field})`
    }

    public static month(field: string): string {
        return `month(${field})`
    }

    public static year(field: string): string {
        return `year(${field})`
    }

    public static hour(field: string): string {
        return `hour(${field})`
    }

    public static minute(field: string): string {
        return `minute(${field})`
    }

    public static second(field: string): string {
        return `second(${field})`
    }
}