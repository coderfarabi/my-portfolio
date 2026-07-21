import { catchAsync } from "@/lib/catch-async";
import { ApiResponse } from "@/lib/api-response";
import { getProjects } from "./projects.service";

export const GET = catchAsync(async () => {
  const data = await getProjects();
  return ApiResponse.success(data, "Projects fetched successfully", 200, {
    count: data.length,
  });
});
