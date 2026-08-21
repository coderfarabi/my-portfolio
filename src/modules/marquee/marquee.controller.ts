import { catchAsync } from "@/lib/catch-async";
import { ApiResponse } from "@/lib/api-response";
import { getMarquee } from "./marquee.service";

export const GET = catchAsync(async () => {
  const data = await getMarquee();
  return ApiResponse.success(data, "Marquee items fetched successfully", 200, {
    count: data.length,
  });
});
