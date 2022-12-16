import { Controller, Get, Inject, Req } from '@nestjs/common';
import { Request } from 'express';
import { RetrieveVehicleStateByTimestamp } from '../../domain/vehicle/retrieve-vehicle-state-by-timestamp';

@Controller()
export class VehicleController {
  constructor(
    @Inject('RetrieveVehicleStateByTimestamp')
    readonly retrieveVehicleStateByTimestamp: RetrieveVehicleStateByTimestamp,
  ) {}

  @Get(':id/timestamp/:timestamp')
  async findByTimestamp(@Req() req: Request): Promise<any> {
    return this.retrieveVehicleStateByTimestamp.execute({
      id: req.params.id,
      timestamp: new Date(req.params.timestamp),
    });
  }
}
