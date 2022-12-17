import { BadRequestException, CACHE_MANAGER } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { VehicleController } from './vehicle.controller';

describe('VehicleController', () => {
  let controller: VehicleController;
  const retrieveVehicleByTimestampMock = {
    execute: jest.fn(),
  };
  const cacheMock = {
    get: jest.fn(),
    set: jest.fn(),
  };

  beforeEach(async () => {
    process.env.CACHED_VEHICLE_DATA_TTL = '10';

    cacheMock.get.mockClear();
    cacheMock.set.mockClear();
    retrieveVehicleByTimestampMock.execute.mockClear();

    const moduleRef = await Test.createTestingModule({
      controllers: [VehicleController],
      providers: [
        {
          provide: 'RetrieveVehicleByTimestamp',
          useValue: retrieveVehicleByTimestampMock,
        },
        {
          provide: CACHE_MANAGER,
          useValue: cacheMock,
        },
      ],
    }).compile();

    controller = moduleRef.get<VehicleController>(VehicleController);
  });

  describe('findByTimestamp', () => {
    it('Should throw BadRequestException error if timestamp is invalid', async () => {
      cacheMock.get.mockResolvedValueOnce(null);

      await expect(() =>
        controller.findByTimestamp({
          path: '/test',
          params: {
            id: '1',
            timestamp: 'invalid-date',
          },
        } as any),
      ).rejects.toThrowError(BadRequestException);
    });

    it('Should cache response and return if cache is empty', async () => {
      cacheMock.get.mockResolvedValueOnce(null);
      retrieveVehicleByTimestampMock.execute.mockResolvedValueOnce({
        name: 'uncached',
      });

      const response = await controller.findByTimestamp({
        path: '/test',
        params: {
          id: '1',
          timestamp: new Date().toISOString(),
        },
      } as any);

      expect(response).toEqual({ name: 'uncached' });
      expect(cacheMock.set).toHaveBeenCalledWith(
        '/test',
        { name: 'uncached' },
        10,
      );
    });

    it('Should return cached data if cache is not empty', async () => {
      cacheMock.get.mockResolvedValueOnce({
        name: 'cached',
      });

      const response = await controller.findByTimestamp({
        path: '/test',
        params: {
          id: '1',
          timestamp: new Date().toISOString(),
        },
      } as any);

      expect(response).toEqual({ name: 'cached' });
      expect(cacheMock.set).not.toHaveBeenCalled();
      expect(retrieveVehicleByTimestampMock.execute).not.toHaveBeenCalled();
    });
  });
});
