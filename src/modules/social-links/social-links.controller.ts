import { catchAsync } from "@/lib/catch-async";
import { ApiResponse } from "@/lib/api-response";
import { getSocialLinks } from "./social-links.service";

export const GET = catchAsync(async () => {
  const data = await getSocialLinks();
  return ApiResponse.success(data, "Social links fetched successfully", 200, {
    count: data.length,
  });
});
