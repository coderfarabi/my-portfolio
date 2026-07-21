import { z } from "zod";

export const SocialPlatformEnum = z.enum([
  "github", "linkedin", "twitter", "instagram", "youtube",
  "facebook", "dribbble", "behance", "devto", "hashnode",
  "medium", "stackoverflow", "discord", "telegram", "whatsapp",
  "email", "website", "other",
]);

export const SocialLinkSchema = z.object({
  id: z.string().optional(),
  platform: SocialPlatformEnum,
  label: z.string().min(1, "Label is required"),
  url: z.string().min(1, "URL is required"),
  iconUrl: z.string().url("Icon URL must be valid").optional(),
  isVisible: z.boolean(),
  order: z.number().int().nonnegative().optional(),
});

export const SocialLinksListSchema = z.array(SocialLinkSchema);
export type SocialLinkInput = z.infer<typeof SocialLinkSchema>;
