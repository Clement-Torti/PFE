/* eslint-disable */
import { Step } from '../models/step';
import { StepType } from '../models/stepType';
import { Param_Type } from '../models/param';

// Generate another mocked test here

export const MOCKED_STEP: Step = {
    title: "Fake step",
    description: "Description of the step of the fake product",
    code: "All bunch of code for the step of the fake product",
    stepType: StepType.LifecycleCommands,
    params: [
        {
            type: Param_Type.STRING,
            name: "HGO Serial number",
            value: "123456789"
        }
    ]
}

export const MOCKED_STEP_2: Step = {
    title: "Second Fake step",
    description: "Description of the step of the fake product",
    code: "All bunch of code for the step of the fake product",
    stepType: StepType.LifecycleCommands,
    params: [
        {
            type: Param_Type.STRING,
            name: "HGO Serial number",
            value: "123456789"
        }
    ]
}

export const EMPTY_STEP: Step = {
    title: "",
    description: "",
    code: "",
    stepType: StepType.Other,
    params: []
}


// Original steps saved in the database
export const BOOT_STEPS: Step[] = [
    MOCKED_STEP,
    MOCKED_STEP_2
]