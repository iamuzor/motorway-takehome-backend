import { RetrieveVehicleByTimestamp } from './retrieve-vehicle-by-timestamp';
import { Vehicle } from '../vehicle';

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
        state: 'test-state',
      }),
    );

    const response = await query.execute({ id: '1', timestamp: new Date() });

    expect(response.data).toBeInstanceOf(Vehicle);
    expect(response.data.state).toEqual('test-state');
  });
});
