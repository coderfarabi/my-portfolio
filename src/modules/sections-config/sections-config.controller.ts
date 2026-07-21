import { catchAsync } from "@/lib/catch-async";
import { ApiResponse } from "@/lib/api-response";
import { getSectionsConfig } from "./sections-config.service";

export const GET = catchAsync(async () => {
  const data = await getSectionsConfig();
  return ApiResponse.success(data, "Sections config fetched successfully");
});
