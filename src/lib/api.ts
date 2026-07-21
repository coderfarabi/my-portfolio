export interface HeroData {
  greeting: string;
  name: string;
  title: string;
  subtitle: string;
  ctaPrimaryLabel: string;
  ctaPrimaryUrl: string;
  ctaSecondaryLabel: string;
  ctaSecondaryUrl: string;
  highlightedWords?: string[];
}

export interface AboutData {
  name: string;
  tagline: string;
  bio: string;
  location: string;
  avatarUrl: string;
  resumeUrl?: string;
  yearsOfExperience: number;
  openToWork: boolean;
}

export type SkillLevel = "beginner" | "intermediate" | "advanced" | "expert";

export interface SkillData {
  id?: string;
  name: string;
  category: string;
  level: SkillLevel;
  iconUrl?: string;
  order?: number;
}

export interface ExperienceData {
  id?: string;
  role: string;
  company: string;
  companyUrl?: string;
  location: string;
  locationType: "remote" | "hybrid" | "on-site";
  employmentType: "full-time" | "part-time" | "contract" | "internship";
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  description: string[];
  technologies: string[];
}

export interface EducationData {
  id?: string;
  institution: string;
  institutionUrl?: string;
  degree: string;
  fieldOfStudy: string;
  location: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  grade?: string;
  activities?: string[];
  description?: string;
}

interface RepositoryDetails {
  name: string;
  description: string | null;
  url: string;
  homepageUrl: string | null;
  stars: number;
  forks: number;
  primaryLanguage: { name: string; color: string } | null;
  topics: string[];
}

export interface ProjectData {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  thumbnailUrl?: string;
  demoUrl?: string;
  githubStats: RepositoryDetails | null;
  isFeatured: boolean;
}

export interface ContactInfoData {
  email: string;
  phone?: string;
  location: string;
  availabilityStatus: "available" | "busy" | "not-available";
  preferredContactMethod: "email" | "phone";
}

export interface SocialLinkData {
  platform: string;
  label: string;
  url: string;
  iconUrl?: string;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

async function fetchApi<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`API ${endpoint} failed: ${res.status}`);
  const json: ApiResponse<T> = await res.json();
  if (!json.success) throw new Error(json.message || `API ${endpoint} failed`);
  return json.data;
}

export function getHero() {
  return fetchApi<HeroData>("/api/hero");
}

export function getAbout() {
  return fetchApi<AboutData>("/api/about");
}

export function getSkills() {
  return fetchApi<SkillData[]>("/api/skills");
}

export function getExperience() {
  return fetchApi<ExperienceData[]>("/api/experience");
}

export function getEducation() {
  return fetchApi<EducationData[]>("/api/education");
}

export function getProjects() {
  return fetchApi<ProjectData[]>("/api/projects");
}

export function getContactInfo() {
  return fetchApi<ContactInfoData>("/api/contact-info");
}

export function getSocialLinks() {
  return fetchApi<SocialLinkData[]>("/api/social-links");
}
