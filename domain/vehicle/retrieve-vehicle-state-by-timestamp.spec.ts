import { RetrieveVehicleStateByTimestamp } from './retrieve-vehicle-state-by-timestamp';
import { Vehicle, VehicleStates } from './vehicle';

describe('RetrieveVehicleStateByTimestamp', () => {
  const vehicleRepoMock = {
    findVehicleByTimestamp: jest.fn(),
  } as any;
  const query = new RetrieveVehicleStateByTimestamp(vehicleRepoMock, console);

  test('Should return a Vehicle instance', async () => {
    vehicleRepoMock.findVehicleByTimestamp.mockResolvedValueOnce(
      new Vehicle('1', VehicleStates.QUOTED),
    );

    const response = await query.execute({ id: '1', timestamp: new Date() });

    expect(response).toBeInstanceOf(Vehicle);
    expect(response.state).toEqual(VehicleStates.QUOTED);
  });
});
