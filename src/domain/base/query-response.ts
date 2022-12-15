interface ToJSON {
  data: any;
  [key: string]: string | number | boolean;
}

export interface QueryResponse {
  toJSON(): ToJSON;
}
