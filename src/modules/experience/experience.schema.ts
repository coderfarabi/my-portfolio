import { z } from "zod";

export const ExperienceSchema = z.object({
  id: z.string().optional(),
  role: z.string().min(1, "Role is required"),
  company: z.string().min(1, "Company name is required"),
  companyUrl: z.string().url("Company URL must be a valid URL").optional(),
  location: z.string().min(1, "Location is required"),
  locationType: z.enum(["remote", "hybrid", "on-site"]),
  employmentType: z.enum(["full-time", "part-time", "contract", "internship"]),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Start date must be in YYYY-MM-DD format"),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "End date must be in YYYY-MM-DD format").optional(),
  isCurrent: z.boolean(),
  description: z.array(z.string()).min(1, "At least one description bullet point is required"),
  technologies: z.array(z.string()).default([]),
  order: z.number().int().nonnegative().optional(),
});

export const ExperienceListSchema = z.array(ExperienceSchema);

export type ExperienceInput = z.infer<typeof ExperienceSchema>;
