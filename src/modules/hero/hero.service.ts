import { fetchHero } from "./hero.repository";
import { HeroSchema } from "./hero.schema";
import type { Hero } from "./hero.types";

export const getHero = async (): Promise<Hero> => {
  const raw = await fetchHero();

  // Validate output against Zod schema
  const parsed = HeroSchema.safeParse(raw);
  if (!parsed.success) {
    console.error("Hero validation failed:", parsed.error.format());
  }

  return raw;
};
