import type { Filter } from './Filter'

export class FieldFactory {
    #expr: string;

    constructor(field_name: string) {
        this.#expr = field_name;
    }

    subField(sub_field: string): FieldFactory {
        this.#expr += `/${sub_field}`;

        return this;
    }

}