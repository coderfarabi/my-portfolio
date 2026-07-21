import { fetchEducation } from "./education.repository";
import { EducationListSchema } from "./education.schema";
import type { Education } from "./education.types";

export const getEducation = async (): Promise<Education[]> => {
  const raw = await fetchEducation();

  // Validate the Firestore collection data against our schema
  const parsed = EducationListSchema.safeParse(raw);
  if (!parsed.success) {
    console.error("Education validation errors:", parsed.error.format());
  }

  // Double check sorting by order, fallback to sorting by start date descending if order is missing
  return raw.sort((a, b) => {
    if (a.order !== undefined && b.order !== undefined) {
      return a.order - b.order;
    }
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
  });
};
