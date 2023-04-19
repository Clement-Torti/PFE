/* eslint-disable */
// See /backend/database/models/paramTypes for the backend equivalent
export enum Param_Type {
    STRING = 'Text',
    NUMBER = 'Number',
    BOOL = 'Boolean',
}

export class Param {
    type: Param_Type;
    name: string;
    value: string;

    constructor (type: Param_Type, name: string, value: string) {
        this.type = type;
        this.name = name;
        this.value = value;
    }

}


