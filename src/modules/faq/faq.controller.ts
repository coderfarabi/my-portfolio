import { catchAsync } from "@/lib/catch-async";
import { ApiResponse } from "@/lib/api-response";
import { getFAQ } from "./faq.service";

export const GET = catchAsync(async () => {
  const data = await getFAQ();
  return ApiResponse.success(data, "FAQ fetched successfully");
});
