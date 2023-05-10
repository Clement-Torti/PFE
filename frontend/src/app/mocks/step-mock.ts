/* eslint-disable */
import { Step } from '../models/step';
import { StepType } from '../models/stepType';
import { ParamType } from '../models/param';

// Generate another mocked test here

export const MOCKED_STEP = {
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

export const MOCKED_STEP_2 = {
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

export const EMPTY_STEP: Step = new Step ("", "", "", "", StepType.OTHER, [], 0)


// Original steps saved in the database
const STEPS = [
    MOCKED_STEP,
    MOCKED_STEP_2,
]

export const BOOT_STEPS: Step[] = STEPS.map((step) => {
    return new Step(
      step._id,
      step.title,
      step.description,
      step.code,
      step.stepType,
      step.params,
      step.index,
    );
  });
  