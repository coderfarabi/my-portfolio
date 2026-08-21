import { z } from "zod";

export const SectionConfigSchema = z.preprocess(
  (value) => {
    if (value === "true") return true;
    if (value === "false") return false;
    return value;
  },
  z.union([
    z.boolean(),
    z.object({
      order: z.number().int().nonnegative().optional(),
      enabled: z.boolean().optional(),
    }),
  ])
);

export const SectionsConfigSchema = z
  .object({
    id: z.string().optional(),
    sections: z.record(z.string(), SectionConfigSchema),
  })
  .superRefine((config, ctx) => {
    const seen = new Map<number, string[]>();
    for (const [key, value] of Object.entries(config.sections)) {
      if (typeof value === "object" && value !== null && value.order !== undefined) {
        const order = value.order;
        const keys = seen.get(order) ?? [];
        keys.push(key);
        seen.set(order, keys);
      }
    }

    for (const [order, keys] of seen.entries()) {
      if (keys.length > 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Duplicate section order ${order} assigned to: ${keys.join(", ")}. Order values must be unique.`,
          path: ["sections"],
        });
      }
    }
  });

export type SectionsConfigInput = z.infer<typeof SectionsConfigSchema>;
