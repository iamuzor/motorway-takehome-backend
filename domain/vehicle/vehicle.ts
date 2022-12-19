export type VehicleId = string;
type VehicleState = string;
type VehicleMake = string;
type VehicleModel = string;

export type VehicleJSON = {
  id: VehicleId;
  make: VehicleId;
  model: VehicleModel;
  state: VehicleState;
};

export class Vehicle {
  private constructor(
    readonly id: VehicleId,
    readonly state: VehicleState,
    readonly make: VehicleMake,
    readonly model: VehicleModel,
  ) {}

  static fromJSON(json: VehicleJSON) {
    return new Vehicle(json.id, json.state, json.make, json.model);
  }
}
