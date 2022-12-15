export interface Logger {
  info(message: string, ...args: []): void;
  error(message: string, ...args: []): void;
  warn(message: string, ...args: []): void;
}
