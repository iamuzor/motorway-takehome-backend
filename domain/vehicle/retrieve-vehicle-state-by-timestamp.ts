import { QueryResponse } from 'domain/base/query-response';
import { Logger } from '../base/logger';
import { Query } from '../base/query';
import { VehicleRepository } from './repositories/vehicle-repository';
import { VehicleId } from './vehicle';

export class RetrieveVehicleStateByTimestamp implements Query {
  constructor(
    readonly vehicleRepo: VehicleRepository,
    readonly logger: Logger,
  ) {}

  async execute(params: {
    id: VehicleId;
    timestamp: Date;
  }): Promise<QueryResponse> {
    this.logger.info(
      `Retrieving info for vehicle (${
        params.id
      }) at timestamp (${params.timestamp.toISOString()})`,
    );

    return new QueryResponse(
      await this.vehicleRepo.findVehicleByTimestamp(
        params.id,
        params.timestamp,
      ),
    );
  }
}
