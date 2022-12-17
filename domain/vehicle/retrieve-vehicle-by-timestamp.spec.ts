import { RetrieveVehicleByTimestamp } from './retrieve-vehicle-by-timestamp';
import { Vehicle, VehicleStates } from './vehicle';

describe('RetrieveVehicleStateByTimestamp', () => {
  const vehicleRepoMock = {
    findVehicleByTimestamp: jest.fn(),
  } as any;
  const query = new RetrieveVehicleByTimestamp(vehicleRepoMock, console);

  test('Should return a Vehicle instance', async () => {
    vehicleRepoMock.findVehicleByTimestamp.mockResolvedValueOnce(
      Vehicle.fromJSON({
        id: '1',
        make: 'test-make',
        model: 'test-model',
        state: VehicleStates.QUOTED,
      }),
    );

    const response = await query.execute({ id: '1', timestamp: new Date() });

    expect(response.data).toBeInstanceOf(Vehicle);
    expect(response.data.state).toEqual(VehicleStates.QUOTED);
  });
});
