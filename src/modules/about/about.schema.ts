import { z } from "zod";

export const AboutStatSchema = z.object({
  number: z.string().optional(),
  label: z.string().min(1, "Stat label is required"),
  value: z.string().min(1, "Stat value is required"),
  description: z.string().optional(),
});

export const AboutSchema = z.object({
  id: z.string().optional(),
  tagline: z.string().min(1, "Tagline is required"),
  bio: z.string().min(1, "Bio is required"),
  location: z.string().min(1, "Location is required"),
  avatarUrl: z.string().url("Avatar URL must be a valid URL"),
  resumeUrl: z.string().url("Resume URL must be a valid URL").optional(),
  yearsOfExperience: z.number().int().nonnegative(),
  showStats: z.boolean().optional(),
  updatedAt: z.string().optional(),
  stats: z.array(AboutStatSchema).optional(),
});

export type AboutInput = z.infer<typeof AboutSchema>;
