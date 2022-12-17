import { Response } from '../base/response';
import { Logger } from '../base/logger';
import { Query } from '../base/query';
import { VehicleRepository } from './repositories/vehicle-repository';
import { Vehicle, VehicleId } from './vehicle';

export class RetrieveVehicleByTimestamp implements Query {
  constructor(
    readonly vehicleRepo: VehicleRepository,
    readonly logger: Logger,
  ) {}

  async execute(params: {
    id: VehicleId;
    timestamp: Date;
  }): Promise<Response<Vehicle>> {
    this.logger.info(
      `Retrieving info for vehicle (${
        params.id
      }) at timestamp (${params.timestamp.toISOString()})`,
    );

    return new Response(
      await this.vehicleRepo.findVehicleByTimestamp(
        params.id,
        params.timestamp,
      ),
    );
  }
}
