import { z } from "zod";

export const EducationSchema = z.object({
  id: z.string().optional(),
  institution: z.string().min(1, "Institution name is required"),
  institutionUrl: z.string().url("Institution URL must be a valid URL").optional(),
  degree: z.string().min(1, "Degree is required"),
  fieldOfStudy: z.string().min(1, "Field of study is required"),
  location: z.string().min(1, "Location is required"),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Start date must be in YYYY-MM-DD format"),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "End date must be in YYYY-MM-DD format").optional(),
  isCurrent: z.boolean(),
  grade: z.string().optional(),
  activities: z.array(z.string()).optional().default([]),
  description: z.string().optional(),
  order: z.number().int().nonnegative().optional(),
});

export const EducationListSchema = z.array(EducationSchema);

export type EducationInput = z.infer<typeof EducationSchema>;
