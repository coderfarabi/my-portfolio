export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly details: unknown;

  constructor(message: string, statusCode = 500, details: unknown = null) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}
