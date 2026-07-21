import { z } from "zod";

export const SectionsConfigSchema = z.object({
  id: z.string().optional(),
  sections: z.record(z.string(), z.boolean()),
});

export type SectionsConfigInput = z.infer<typeof SectionsConfigSchema>;
