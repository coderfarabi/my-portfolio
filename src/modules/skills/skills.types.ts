export type SkillLevel = "beginner" | "intermediate" | "advanced" | "expert";

export interface Skill {
  id?: string;
  name: string;
  category: string;
  level: SkillLevel;
  iconUrl?: string;
  order?: number;
}

export interface TechnologyItem {
  name: string;
  url?: string;
}

export interface ServiceItem {
  name: string;
  description?: string;
  technologies?: TechnologyItem[];
}

export interface Services {
  id?: string;
  description?: string;
  services?: ServiceItem[];
}
