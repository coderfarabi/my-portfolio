import { catchAsync } from "@/lib/catch-async";
import { ApiResponse } from "@/lib/api-response";
import { getAbout } from "./about.service";

export const GET = catchAsync(async () => {
  const data = await getAbout();
  return ApiResponse.success(data, "About data fetched successfully");
});
