import { z } from "zod";

export const HeroSchema = z.object({
  id: z.string().optional(),
  greeting: z.string().min(1, "Greeting is required"),
  name: z.string().min(1, "Name is required"),
  title: z.string().min(1, "Title is required"),
  subtitle: z.string().min(1, "Subtitle is required"),
  ctaPrimaryLabel: z.string().min(1, "Primary CTA label is required"),
  ctaPrimaryUrl: z.string().min(1, "Primary CTA URL is required"),
  ctaSecondaryLabel: z.string().min(1, "Secondary CTA label is required"),
  ctaSecondaryUrl: z.string().min(1, "Secondary CTA URL is required"),
  highlightedWords: z.array(z.string()).optional().default([]),
  siteTitle: z.string().optional(),
  faviconUrl: z.string().optional(),
  brandName: z.string().optional(),
  cursorEnabled: z.boolean().optional(),
});

export type HeroInput = z.infer<typeof HeroSchema>;
