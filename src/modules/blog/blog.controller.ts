import { catchAsync } from "@/lib/catch-async";
import { ApiResponse } from "@/lib/api-response";
import { getBlogPosts } from "./blog.service";

export const GET = catchAsync(async () => {
  const data = await getBlogPosts();
  return ApiResponse.success(data, "Blog posts fetched successfully");
});
