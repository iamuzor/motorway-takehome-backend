import { CacheModule, Module } from '@nestjs/common';
import { getDatabaseClient, getLogger } from '../common';
import { VehicleController } from './vehicle.controller';
import { VehicleRepository } from './vehicle.repository';
import { RetrieveVehicleByTimestamp } from '../../domain/vehicle/queries/retrieve-vehicle-by-timestamp';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
    }),
  ],
  controllers: [VehicleController],
  providers: [
    {
      provide: 'RetrieveVehicleByTimestamp',
      useFactory: async () => {
        return new RetrieveVehicleByTimestamp(
          VehicleRepository.getInstance(await getDatabaseClient()),
          getLogger(),
        );
      },
    },
  ],
})
export class VehicleModule {}
