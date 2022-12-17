import { CacheModule, Module } from '@nestjs/common';
import { getDatabaseClient, getLogger } from '../common';
import { RetrieveVehicleByTimestamp } from '../../domain/vehicle/retrieve-vehicle-by-timestamp';
import { VehicleController } from './vehicle.controller';
import { VehicleRepository } from './vehicle.repository';

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
