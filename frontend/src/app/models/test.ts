/* eslint-disable */
import { DeviceType } from './deviceType';
import { Step } from './step';

export class Test {
    _id: string;
    title: string = '';
    description: string = '';
    prerequisites: string = '';
    author: string = '';

    deviceType: DeviceType | null = null;
    deviceName: string = '';
    steps: Step[] = [];

    constructor(_id: string, title: string, description: string, prerequisites: string, author: string, deviceType: DeviceType | null, deviceName: string, steps: Step[]) {
        this._id = _id;
        this.title = title;
        this.description = description;
        this.prerequisites = prerequisites;
        this.author = author;
        this.deviceType = deviceType;
        this.deviceName = deviceName;
        this.steps = steps;
    }
}
  