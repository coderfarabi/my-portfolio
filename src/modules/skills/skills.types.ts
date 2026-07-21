export type SkillLevel = "beginner" | "intermediate" | "advanced" | "expert";

export interface Skill {
  id?: string;
  name: string;
  category: string;
  level: SkillLevel;
  iconUrl?: string;
  order?: number;
}
