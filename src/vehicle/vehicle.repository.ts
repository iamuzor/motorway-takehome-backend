import { Vehicle, VehicleId } from '../../domain/vehicle/vehicle';
import { VehicleRepository as IVehicleRepository } from '../../domain/vehicle/repositories/vehicle-repository';
import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';

@Injectable()
export class VehicleRepository implements IVehicleRepository {
  static instance: VehicleRepository;

  constructor(private readonly db: Knex) {}

  static getInstance(db: Knex): VehicleRepository {
    if (!this.instance) {
      this.instance = new VehicleRepository(db);
    }

    return this.instance;
  }

  async findVehicleByTimestamp(
    id: VehicleId,
    timestamp: Date,
  ): Promise<Vehicle | null> {
    const data = await this.db
      .from('vehicles')
      .join('stateLogs', {
        'stateLogs.vehicleId': 'vehicles.id',
      })
      .where('vehicles.id', id)
      .where('stateLogs.timestamp', '<=', timestamp.toISOString())
      .orderBy('stateLogs.timestamp', 'desc')
      .limit(1)
      .select(
        'vehicles.id',
        'vehicles.make',
        'vehicles.model',
        'stateLogs.state',
      );

    if (!data.length) {
      return null;
    }

    return Vehicle.fromJSON(data[0]);
  }
}
