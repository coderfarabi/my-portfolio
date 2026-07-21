import { catchAsync } from "@/lib/catch-async";
import { ApiResponse } from "@/lib/api-response";
import { getTestimonials } from "./testimonials.service";

export const GET = catchAsync(async () => {
  const data = await getTestimonials();
  return ApiResponse.success(data, "Testimonials fetched successfully");
});
