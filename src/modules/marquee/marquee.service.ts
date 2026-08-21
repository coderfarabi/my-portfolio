import { fetchMarquee } from "./marquee.repository";
import { MarqueeListSchema } from "./marquee.schema";
import type { MarqueeItem } from "./marquee.types";

export const getMarquee = async (): Promise<MarqueeItem[]> => {
  const raw = await fetchMarquee();

  // Validate the Firestore collection before returning
  const parsed = MarqueeListSchema.safeParse(raw);
  if (!parsed.success) {
    console.error("Marquee data validation errors:", parsed.error.format());
  }

  return parsed.data!;
};
