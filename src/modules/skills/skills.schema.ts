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

export type SkillInput = z.infer<typeof SkillSchema>;
