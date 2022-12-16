import { Vehicle, VehicleId } from "../vehicle";

interface FindVehicleParams {
  id: VehicleId;
  timestamp: Date;
}

export interface VehicleRepository {
  findVehicleByTimestamp(params: FindVehicleParams): Promise<Vehicle | null>;
}
