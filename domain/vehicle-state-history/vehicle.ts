export type VehicleId = string;
export type VehicleState = string;

export class Vehicle {
  constructor(readonly id: VehicleId, readonly state: VehicleState) {}
}
