/* eslint-disable */
export enum Param_Type {
    STRING = 'Text',
    NUMBER = 'Number',
    BOOL = 'Boolean',
}

export class Param {
    type: Param_Type;
    name: string;
    value: Object;

    constructor (type: Param_Type, name: string, value: Object) {
        this.type = type;
        this.name = name;
        this.value = value;
    }

}


