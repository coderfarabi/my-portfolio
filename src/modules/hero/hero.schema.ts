import { z } from "zod";

export const HeroSchema = z.object({
  id: z.string().optional(),
  greeting: z.string().min(1, "Greeting is required"),
  name: z.string().min(1, "Name is required"),
  title: z.string().min(1, "Title is required"),
  subtitle: z.string().min(1, "Subtitle is required"),
  ctaPrimaryLabel: z.string().min(1, "Primary CTA label is required"),
  ctaPrimaryUrl: z.string().url("Primary CTA URL must be a valid URL"),
  ctaSecondaryLabel: z.string().min(1, "Secondary CTA label is required"),
  ctaSecondaryUrl: z.string().url("Secondary CTA URL must be a valid URL"),
  highlightedWords: z.array(z.string()).optional().default([]),
});

export type HeroInput = z.infer<typeof HeroSchema>;
