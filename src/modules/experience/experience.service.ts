import { fetchExperiences } from "./experience.repository";
import { ExperienceListSchema } from "./experience.schema";
import type { Experience } from "./experience.types";

export const getExperiences = async (): Promise<Experience[]> => {
  const raw = await fetchExperiences();

  // Validate the Firestore collection data against our schema
  const parsed = ExperienceListSchema.safeParse(raw);
  if (!parsed.success) {
    console.error("Experience validation errors:", parsed.error.format());
  }

  // Double check sorting by order, fallback to sorting by start date descending if order is missing
  return raw.sort((a, b) => {
    if (a.order !== undefined && b.order !== undefined) {
      return a.order - b.order;
    }
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
  });
};
