/* eslint-disable */
import { DeviceType } from '../models/deviceType';
import { Test } from '../models/test';
import { MOCKED_STEP } from './step-mock';


export const MOCKED_TEST: Test = {
    _id: '123',
    title: "Fake product test",
    description: "Description of the test of the fake product",
    prerequisites: "All bunch of prerequisites for the test of the fake product",
    author: "fake Tester",
    deviceType: DeviceType.Scale,
    deviceName: "Fake device",
    steps: [MOCKED_STEP, MOCKED_STEP, MOCKED_STEP, MOCKED_STEP,MOCKED_STEP, MOCKED_STEP, MOCKED_STEP]
}
 
