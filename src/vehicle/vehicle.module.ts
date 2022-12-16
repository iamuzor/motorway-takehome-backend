import { Module } from '@nestjs/common';
import { VehicleRepository } from './vehicle.repository';
import { VehicleController } from './vehicle.controller';
import { RetrieveVehicleStateByTimestamp } from '../../domain/vehicle/retrieve-vehicle-state-by-timestamp';
import knex from 'knex';

@Module({
  imports: [],
  controllers: [VehicleController],
  providers: [
    {
      provide: 'RetrieveVehicleStateByTimestamp',
      useValue: new RetrieveVehicleStateByTimestamp(
        VehicleRepository.getInstance(
          knex({
            client: 'pg',
            connection: {
              host: 'localhost',
              port: 5432,
              user: 'user',
              password: 'password',
              database: 'motorway',
            },
          }),
        ),
        console,
      ),
    },
  ],
})
export class VehicleModule {}
