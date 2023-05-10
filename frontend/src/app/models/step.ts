/* eslint-disable */
import { StepType } from './stepType';
import { Param } from './param';

export class Step {
    _id: string;
    title: string;
    description: string;
    code: string;

    stepType: StepType;
    params: Param[];

    index: number;

    constructor (_id: string, title: string, description: string, code: string, stepType: StepType, params: Param[], index: number) {
        this._id = _id;
        this.title = title;
        this.description = description;
        this.code = code;
        this.stepType = stepType;
        this.params = params;
        this.index = index;
    }

    equals(other: Step): boolean {
        return (this.index === other.index);
    }
}
  