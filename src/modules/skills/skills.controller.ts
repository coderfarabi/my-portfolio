import { catchAsync } from "@/lib/catch-async";
import { ApiResponse } from "@/lib/api-response";
import { getSkills, getSkillsByCategory, getServices } from "./skills.service";
import { NextRequest } from "next/server";

export const GET = catchAsync(async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const grouped = searchParams.get("grouped") === "true";
  const services = searchParams.get("services") === "true";

  if (services) {
    const data = await getServices();
    return ApiResponse.success(data, "Services fetched successfully");
  }

  if (grouped) {
    const data = await getSkillsByCategory();
    return ApiResponse.success(data, "Skills fetched and grouped by category");
  }

  const data = await getSkills();
  return ApiResponse.success(data, "Skills fetched successfully", 200, {
    count: data.length,
  });
});
