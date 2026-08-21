import { z } from "zod";

export const SkillLevelEnum = z.enum(["beginner", "intermediate", "advanced", "expert"]);

export const SkillSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Skill name is required"),
  category: z.string().min(1, "Skill category is required"),
  level: SkillLevelEnum,
  iconUrl: z.string().url("Icon URL must be a valid URL").optional(),
  order: z.number().int().nonnegative().optional(),
});

export const SkillsListSchema = z.array(SkillSchema);

export const ServiceItemSchema = z.object({
  name: z.string().min(1, "Service name is required"),
  description: z.string().optional(),
});

export const ServicesSchema = z.object({
  id: z.string().optional(),
  description: z.string().optional(),
  services: z.array(ServiceItemSchema).optional(),
});

export type SkillInput = z.infer<typeof SkillSchema>;
export type ServicesInput = z.infer<typeof ServicesSchema>;
