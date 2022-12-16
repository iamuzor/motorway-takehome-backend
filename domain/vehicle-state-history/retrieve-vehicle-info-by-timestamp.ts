import { Logger } from "../base/logger";
import { Query } from "../base/query";
import { VehicleRepository } from "./repositories/vehicle-repository";
import { Vehicle, VehicleId } from "./vehicle";

interface QueryParams {
  id: VehicleId;
  timestamp: Date;
}

export class RetrieveVehicleInfoByTimestamp implements Query {
  constructor(
    readonly vehicleRepo: VehicleRepository,
    readonly logger: Logger,
    readonly params: QueryParams
  ) {}

  async execute(): Promise<Vehicle | null> {
    this.logger.info(
      `Retrieving info for vehicle (${this.params.id}) at timestamp (${this.params.timestamp})`
    );

    return await this.vehicleRepo.findVehicleByTimestamp(this.params);
  }
}
