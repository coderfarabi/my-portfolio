import { NextRequest } from "next/server";
import { catchAsync } from "@/lib/catch-async";
import { ApiResponse } from "@/lib/api-response";
import { getContactInfo, submitContactMessage } from "./contact.service";

export const getContactInfoHandler = catchAsync(async () => {
  const data = await getContactInfo();
  return ApiResponse.success(data, "Contact info fetched successfully");
});

export const postContactMessageHandler = catchAsync(async (request: NextRequest) => {
  const body: unknown = await request.json();
  const message = await submitContactMessage(body);
  return ApiResponse.success(message, "Message sent successfully", 201);
});
