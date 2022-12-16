import { Logger } from '../base/logger';
import { Query } from '../base/query';
import { VehicleRepository } from './repositories/vehicle-repository';
import { Vehicle, VehicleId } from './vehicle';

interface QueryParams {
  id: VehicleId;
  timestamp: Date;
}

export class RetrieveVehicleStateByTimestamp implements Query {
  constructor(
    readonly vehicleRepo: VehicleRepository,
    readonly logger: Logger,
  ) {}

  async execute(params: QueryParams): Promise<Vehicle | null> {
    this.logger.info(
      `Retrieving info for vehicle (${
        params.id
      }) at timestamp (${params.timestamp.toISOString()})`,
    );

    return await this.vehicleRepo.findVehicleByTimestamp(
      params.id,
      params.timestamp,
    );
  }
}
