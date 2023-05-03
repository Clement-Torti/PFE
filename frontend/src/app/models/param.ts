/* eslint-disable */
// See /backend/database/models/paramTypes for the backend equivalent
export enum ParamType {
    STRING = 'Text',
    NUMBER = 'Number',
    BOOL = 'Boolean',
}

export class Param {
    type: ParamType;
    name: string;
    value: string;

    constructor (type: ParamType, name: string, value: string="") {
        this.type = type;
        this.name = name;
        this.value = value;
    }

}


