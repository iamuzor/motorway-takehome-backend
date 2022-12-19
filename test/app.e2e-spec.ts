import axios from 'axios';

describe('VehicleController (e2e)', () => {
  const http = axios.create({
    baseURL: 'http://localhost:3000',
  });

  describe('GET /:id/timestamp/:timestamp', () => {
    it('Returns vehicle data with the expected properties', async () => {
      const response = await http.get('/2/timestamp/2022-09-11 17:03:17+00');

      expect(response.status).toEqual(200);
      expect(response.data.data).toHaveProperty('id');
      expect(response.data.data).toHaveProperty('state');
      expect(response.data.data).toHaveProperty('make');
      expect(response.data.data).toHaveProperty('model');
    });

    it('Returns null if vehicle is not found', async () => {
      const response = await http.get(
        '/1234567890/timestamp/2022-09-11 17:03:17+00',
      );

      expect(response.status).toEqual(200);
      expect(response.data.data).toBe(null);
    });

    it('Returns 400 error if timestamp is invalid', (done) => {
      http.get('/2/timestamp/xxx').catch((error) => {
        done();

        expect(error.response.status).toEqual(400);
        expect(error.response.data.message).toEqual('INVALID_TIMESTAMP');
      });
    });
  });
});
