import { NextResponse } from "next/server";

export interface SuccessResponse<T> {
  success: true;
  message: string;
  data: T;
  meta?: Record<string, unknown>;
  timestamp: string;
}

export interface ErrorResponse {
  success: false;
  message: string;
  error: unknown;
  statusCode: number;
  timestamp: string;
}

export class ApiResponse {
  static success<T>(
    data: T,
    message = "Success",
    statusCode = 200,
    meta?: Record<string, unknown>
  ): NextResponse<SuccessResponse<T>> {
    return NextResponse.json(
      {
        success: true,
        message,
        data,
        meta,
        timestamp: new Date().toISOString(),
      },
      { status: statusCode }
    );
  }

  static error(
    message: string,
    statusCode = 500,
    error: unknown = null
  ): NextResponse<ErrorResponse> {
    return NextResponse.json(
      {
        success: false,
        message,
        error: error instanceof Error ? { message: error.message, stack: error.stack } : error,
        statusCode,
        timestamp: new Date().toISOString(),
      },
      { status: statusCode }
    );
  }
}
