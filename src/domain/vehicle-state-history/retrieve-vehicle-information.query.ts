import { Logger } from "../base/logger";
import { Query } from "../base/query";
import { QueryResponse } from "../base/query-response";

interface QueryParams {
  vehicleId: string;
  timestamp: Date;
}

export class RetrieveVehicleInfo implements Query {
  constructor(readonly params: QueryParams, readonly logger: Logger) {}

  async execute(): Promise<QueryResponse> {
    throw new Error("Method not implemented.");
  }
}
