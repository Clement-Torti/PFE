/* eslint-disable */
export class Param {
    enum TYPE {
        STRING,
        NUMBER,
        BOOL
    };

    type: TYPE;
    name: string;
    value: Object;

    constructor (type: TYPE, name: string, value: Object) {
        this.type = type;
        this.name = name;
        this.value = value;
    }

}
