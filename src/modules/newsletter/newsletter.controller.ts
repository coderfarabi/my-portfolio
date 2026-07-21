import { NextRequest } from "next/server";
import { catchAsync } from "@/lib/catch-async";
import { ApiResponse } from "@/lib/api-response";
import { subscribeToNewsletter } from "./newsletter.service";

export const POST = catchAsync(async (request: NextRequest) => {
  const body: unknown = await request.json();
  const subscriber = await subscribeToNewsletter(body);
  return ApiResponse.success(subscriber, "Successfully subscribed to the newsletter", 201);
});
