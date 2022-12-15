import { QueryResponse } from "./query-response";
import { Logger as ILogger } from "./logger";

export interface Query {
  readonly logger: ILogger;

  execute(): Promise<QueryResponse>;
}
