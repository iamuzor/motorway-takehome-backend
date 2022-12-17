import { Response } from './response';
import { Logger as ILogger } from './logger';

export interface Query {
  readonly logger: ILogger;

  execute(...args: any[]): Promise<Response<any>>;
}
