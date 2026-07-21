import { catchAsync } from "@/lib/catch-async";
import { ApiResponse } from "@/lib/api-response";
import { getExperiences } from "./experience.service";

export const GET = catchAsync(async () => {
  const data = await getExperiences();
  return ApiResponse.success(data, "Experiences fetched successfully", 200, {
    count: data.length,
  });
});
