import { catchAsync } from "@/lib/catch-async";
import { ApiResponse } from "@/lib/api-response";
import { getEducation } from "./education.service";

export const GET = catchAsync(async () => {
  const data = await getEducation();
  return ApiResponse.success(data, "Education history fetched successfully", 200, {
    count: data.length,
  });
});
