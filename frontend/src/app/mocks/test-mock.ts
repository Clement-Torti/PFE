/* eslint-disable */
import { DeviceType } from '../models/deviceType';
import { Test } from '../models/test';
import { BOOT_STEPS } from './step-mock';


export const MOCKED_TEST: Test = {
    _id: '123',
    title: "Fake product test",
    description: "Description of the test of the fake product",
    prerequisites: "All bunch of prerequisites for the test of the fake product",
    author: "fake Tester",
    deviceType: DeviceType.WeightScale,
    deviceName: "Fake device",
    steps: [[BOOT_STEPS[0], BOOT_STEPS[1]],[ BOOT_STEPS[0], BOOT_STEPS[1], BOOT_STEPS[0], BOOT_STEPS[1]]]
}

 
export function getEmptyTest(): Test {
    return {
        _id: 'XXX',
        title: "XXX",
        description: "XXX",
        prerequisites: "XXX",
        author: "XXX",
        deviceType: null,
        deviceName: "",
        steps: []
    }
}
 
