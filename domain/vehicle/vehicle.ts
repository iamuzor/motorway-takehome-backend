export type VehicleId = string;
export enum VehicleStates {
  QUOTED = 'quoted',
  SELLING = 'selling',
  TIMESTAMP = 'selling',
}
type VehicleMake = string;
type VehicleModel = string;
export type VehicleJSON = {
  id: VehicleId;
  make: VehicleId;
  model: VehicleModel;
  state: VehicleStates;
};

export class Vehicle {
  private constructor(
    readonly id: VehicleId,
    readonly state: VehicleStates,
    readonly make: VehicleMake,
    readonly model: VehicleModel,
  ) {}

  static fromJSON(json: VehicleJSON) {
    return new Vehicle(json.id, json.state, json.make, json.model);
  }
}
