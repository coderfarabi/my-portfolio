import { z } from "zod";

export const MarqueeItemSchema = z.object({
  id: z.string().optional(),
  label: z.string().min(1, "Marquee label is required"),
  order: z.number().int().nonnegative().optional(),
});

export const MarqueeListSchema = z.array(MarqueeItemSchema);

export type MarqueeInput = z.infer<typeof MarqueeItemSchema>;
