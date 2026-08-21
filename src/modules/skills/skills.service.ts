import { fetchSkills, fetchServices } from "./skills.repository";
import { SkillsListSchema, ServicesSchema } from "./skills.schema";
import type { Skill, Services } from "./skills.types";

export const getSkills = async (): Promise<Skill[]> => {
  const raw = await fetchSkills();

  // Validate the Firestore collection before returning
  const parsed = SkillsListSchema.safeParse(raw);
  if (!parsed.success) {
    console.error("Skills data validation errors:", parsed.error.format());
  }

  return parsed.data! as Skill[];
};

export const getServices = async (): Promise<Services> => {
  const raw = await fetchServices();

  // Validate the Firestore document against the schema before returning
  const parsed = ServicesSchema.safeParse(raw);
  if (!parsed.success) {
    console.error("Services data validation errors:", parsed.error.format());
  }

  return parsed.data! as Services;
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
