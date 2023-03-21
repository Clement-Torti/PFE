/* eslint-disable */
import { Device } from './device';
import { Step } from './step';

export class Test {
    _id: string;
    title: string;
    description: string;
    prerequisites: string;
    author: string;
    isTestDevice: boolean;

    device: Device;
    steps: Step[];

    constructor (_id: string, title: string, description: string, prerequisites: string, author: string, isTestDevice: boolean, device: Device, steps: Step[]) {
        this._id = _id;
        this.title = title;
        this.description = description;
        this.prerequisites = prerequisites;
        this.author = author;
        this.isTestDevice = isTestDevice;
        this.device = device;
        this.steps = steps;
    }
}
  