import { fetchSectionsConfig } from "./sections-config.repository";
import { SectionsConfigSchema } from "./sections-config.schema";
import type { SectionsConfig } from "./sections-config.types";

export const getSectionsConfig = async (): Promise<SectionsConfig> => {
  const raw = await fetchSectionsConfig();

  const parsed = SectionsConfigSchema.safeParse(raw);
  if (!parsed.success) {
    console.error("SectionsConfig validation failed:", parsed.error.format());
  }

  return raw;
};
