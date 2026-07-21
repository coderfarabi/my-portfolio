import { fetchFAQ } from "./faq.repository";
import { FAQSchema } from "./faq.schema";
import type { FAQ } from "./faq.types";

export const getFAQ = async (): Promise<FAQ[]> => {
  const raw = await fetchFAQ();

  for (const item of raw) {
    const parsed = FAQSchema.safeParse(item);
    if (!parsed.success) {
      console.error("FAQ validation failed:", parsed.error.format());
    }
  }

  return raw;
};
