import { fetchSkills } from "./skills.repository";
import { SkillsListSchema } from "./skills.schema";
import type { Skill } from "./skills.types";

export const getSkills = async (): Promise<Skill[]> => {
  const raw = await fetchSkills();

  // Validate the Firestore collection before returning
  const parsed = SkillsListSchema.safeParse(raw);
  if (!parsed.success) {
    console.error("Skills data validation errors:", parsed.error.format());
  }

  return raw;
};

export const getSkillsByCategory = async (): Promise<Record<string, Skill[]>> => {
  const skills = await getSkills();

  return skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    const cat = skill.category;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {});
};
