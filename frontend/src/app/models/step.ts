/* eslint-disable */
import { StepType } from './stepType';
import { Param } from './param';

export class Step {
    title: string;
    description: string;
    code: string;

    stepType: StepType;
    params: Param[];


    constructor (title: string, description: string, code: string, stepType: StepType, params: Param[]) {
        this.title = title;
        this.description = description;
        this.code = code;
        this.stepType = stepType;
        this.params = params;
    }

}
  