import { Vehicle, VehicleId } from '../vehicle';

export interface VehicleRepository {
  findVehicleByTimestamp(
    id: VehicleId,
    timestamp: Date,
  ): Promise<Vehicle | null>;
}
