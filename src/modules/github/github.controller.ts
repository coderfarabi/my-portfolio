import { catchAsync } from "@/lib/catch-async";
import { ApiResponse } from "@/lib/api-response";
import { getPinnedRepositories } from "./github.service";
import { NextRequest } from "next/server";

export const GET = catchAsync(async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const limitStr = searchParams.get("limit");
  let limit = 6;

  if (limitStr) {
    const parsed = parseInt(limitStr, 10);
    if (!isNaN(parsed) && parsed >= 1 && parsed <= 50) {
      limit = parsed;
    }
  }

  const data = await getPinnedRepositories(limit);
  return ApiResponse.success(data, "Pinned repositories fetched successfully", 200, {
    count: data.length,
  });
});
