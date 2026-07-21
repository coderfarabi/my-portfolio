import { z } from "zod";

export const AboutSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  tagline: z.string().min(1, "Tagline is required"),
  bio: z.string().min(1, "Bio is required"),
  location: z.string().min(1, "Location is required"),
  avatarUrl: z.string().url("Avatar URL must be a valid URL"),
  resumeUrl: z.string().url("Resume URL must be a valid URL").optional(),
  yearsOfExperience: z.number().int().nonnegative(),
  openToWork: z.boolean(),
  updatedAt: z.string().optional(),
});

export type AboutInput = z.infer<typeof AboutSchema>;
