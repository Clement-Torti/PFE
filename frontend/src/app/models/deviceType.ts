/* eslint-disable */
export enum DeviceType {
    WeightScale = "WeightScale",
    Glucometer = "Glucometer",
    BloodPressure = "Blood Pressure",
    Spirotel = "Spirotel",
    Oximeter = "Oximeter",
    Tablet = "Tablet",
    Thermometer = "Thermometer",
    Pedometer = "Pedometer",
    ECU = "ECU"
}

export namespace DeviceType {
    export function getAbbreviation(deviceType: DeviceType): string {
      switch (deviceType) {
        case DeviceType.WeightScale:
          return "ws";
        case DeviceType.Glucometer:
          return "gluco";
        case DeviceType.BloodPressure:
          return "bp";
        case DeviceType.Spirotel:
          return "spiro";
        case DeviceType.Oximeter:
          return "oxy";
        case DeviceType.Tablet:
          return "tb";
        case DeviceType.Thermometer:
          return "thermo";
        case DeviceType.Pedometer:
          return "pedometer";
        case DeviceType.ECU:
          return "ecu";
        default:
          return "";
      }
    }
  }