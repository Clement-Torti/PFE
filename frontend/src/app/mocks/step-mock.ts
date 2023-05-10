/* eslint-disable */
import { Step } from '../models/step';
import { StepType } from '../models/stepType';
import { ParamType } from '../models/param';

// Generate another mocked test here

export const MOCKED_STEP: Step = {
    _id: "1",
    title: "Fake step",
    description: "Description of the step of the fake product",
    code: "All bunch of code for the step of the fake product",
    stepType: StepType.LIFECYCLE_COMMANDS,
    params: [
        {
            type: ParamType.STRING,
            name: "HGO Serial number",
            value: "123456789"
        }
    ],
    index: 0
}

export const MOCKED_STEP_2: Step = {
    _id: "2",
    title: "Second Fake step",
    description: "Description of the step of the fake product",
    code: "All bunch of code for the step of the fake product",
    stepType: StepType.LIFECYCLE_COMMANDS,
    params: [
        {
            type: ParamType.STRING,
            name: "HGO Serial number",
            value: "123456789"
        }
     ],
    index: 1
}

export const EMPTY_STEP: Step = {
    _id: "",
    title: "",
    description: "",
    code: "",
    stepType: StepType.OTHER,
    params: [],
    index: 0,
}


// Original steps saved in the database
export const BOOT_STEPS: Step[] = [
    MOCKED_STEP,
    MOCKED_STEP_2
]