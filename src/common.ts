import knex, { Knex } from 'knex';
import * as winston from 'winston';
import { Logger } from './base/logger';

export const getDatabaseClient = async (): Promise<Knex> => {
  try {
    const instance = knex({
      client: 'pg',
      connection: {
        host: process.env.POSTGRES_HOST,
        port: Number(process.env.POSTGRES_PORT),
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
      },
    });

    // we execute a query to confirm successful connection to the database
    await instance.raw('SELECT 1');

    return instance;
  } catch (e) {
    throw new Error(JSON.stringify(e));
  }
};

export const getLogger = (): Logger => {
  return winston.createLogger({
    format: winston.format.json(),
    transports: [
      new winston.transports.Console({
        level: 'info',
        format: winston.format.json(),
      }),
    ],
  });
};
