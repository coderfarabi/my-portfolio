import { NextRequest } from "next/server";
import { ZodError } from "zod";
import { ApiError } from "./api-error";
import { ApiResponse } from "./api-response";

// Next.js Route Handler type definition
type ContextType = {
  params: Promise<Record<string, string | string[]>>;
};

type RouteHandler = (
  request: NextRequest,
  context: ContextType
) => Promise<Response> | Response;

export function catchAsync(handler: RouteHandler): RouteHandler {
  return async (request: NextRequest, context: ContextType) => {
    try {
      return await handler(request, context);
    } catch (error) {
      console.error("💥 Request error detected:", error);

      // Zod Validation Error handling
      if (error instanceof ZodError) {
        return ApiResponse.error(
          "Validation failed",
          400,
          error.flatten().fieldErrors
        );
      }

      // App custom API Error handling
      if (error instanceof ApiError) {
        return ApiResponse.error(error.message, error.statusCode, error.details);
      }

      // Fallback generic Server Error handling
      const isDev = process.env.NODE_ENV === "development";
      return ApiResponse.error(
        error instanceof Error ? error.message : "Internal Server Error",
        500,
        isDev && error instanceof Error ? { stack: error.stack } : null
      );
    }
  };
}
