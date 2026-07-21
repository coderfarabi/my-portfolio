import { catchAsync } from "@/lib/catch-async";
import { ApiResponse } from "@/lib/api-response";
import { getHero } from "./hero.service";

export const GET = catchAsync(async () => {
  const data = await getHero();
  return ApiResponse.success(data, "Hero data fetched successfully");
});
