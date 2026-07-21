import { fetchAbout } from "./about.repository";
import { AboutSchema } from "./about.schema";
import type { About } from "./about.types";

export const getAbout = async (): Promise<About> => {
  const raw = await fetchAbout();

  // Validate the Firestore document against the schema before returning
  const parsed = AboutSchema.safeParse(raw);
  if (!parsed.success) {
    console.error("About data validation failed:", parsed.error.format());
  }

  return raw;
};
