import {
  BadRequestException,
  CacheInterceptor,
  CACHE_MANAGER,
  Controller,
  Get,
  Inject,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Request } from 'express';
import { RetrieveVehicleByTimestamp } from '../../domain/vehicle/queries/retrieve-vehicle-by-timestamp';

@Controller()
export class VehicleController {
  constructor(
    @Inject('RetrieveVehicleByTimestamp')
    private readonly retrieveVehicleStateByTimestamp: RetrieveVehicleByTimestamp,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  /**
   * This endpoint returns vehicle data at a given time. Response is temporarily cached.
   * @param req
   * @returns
   */
  @Get(':id/timestamp/:timestamp')
  @UseInterceptors(CacheInterceptor)
  async findByTimestamp(@Req() req: Request): Promise<any> {
    const cacheKey = req.path;
    const cacheTTL = Number(process.env.CACHED_VEHICLE_DATA_TTL);
    const cachedResponse = await this.cacheManager.get(cacheKey);

    if (cachedResponse) {
      return cachedResponse;
    }

    const timestamp = new Date(req.params.timestamp);

    if (!timestamp?.getTime()) {
      throw new BadRequestException('INVALID_TIMESTAMP');
    }

    const response = await this.retrieveVehicleStateByTimestamp.execute({
      id: req.params.id,
      timestamp: new Date(req.params.timestamp),
    });

    await this.cacheManager.set(cacheKey, response, cacheTTL);

    return response;
  }
}
