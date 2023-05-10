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

    groupIndex: number;
    index: number;

    constructor (_id: string, title: string, description: string, code: string, stepType: StepType, params: Param[], groupIndex: number, index: number) {
        this._id = _id;
        this.title = title;
        this.description = description;
        this.code = code;
        this.stepType = stepType;
        this.params = params;
        this.groupIndex = groupIndex;
        this.index = index;
    }

    equals(other: Step): boolean {
        return (this.groupIndex === other.groupIndex) && (this.index === other.index);
    }
}
  