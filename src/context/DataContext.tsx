"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import {
  getSectionsConfig,
  getHero,
  getAbout,
  getSkills,
  getServices,

  getExperience,
  getEducation,
  getProjects,
  getTestimonials,
  getFAQ,
  getBlogPosts,
  getContactInfo,
  getSocialLinks,
  type HeroData,
  type AboutData,
  type SkillData,
  type ServicesData,
  type ExperienceData,
  type EducationData,
  type ProjectData,
  type TestimonialData,
  type FAQData,
  type BlogPostData,
  type ContactInfoData,
  type SocialLinkData,
  type SectionsConfigData,
} from "@/lib/api";

export interface PortfolioData {
  sectionsConfig: SectionsConfigData | null;
  hero: HeroData | null;
  about: AboutData | null;
  skills: SkillData[];
  services: ServicesData | null;
  experience: ExperienceData[];
  education: EducationData[];
  projects: ProjectData[];
  testimonials: TestimonialData[];
  faq: FAQData[];
  blog: BlogPostData[];
  contactInfo: ContactInfoData | null;
  socialLinks: SocialLinkData[];
  loading: boolean;
}

const DataContext = createContext<PortfolioData>({
  sectionsConfig: null,
  hero: null,
  about: null,
  skills: [],
  services: null,
  experience: [],
  education: [],
  projects: [],
  testimonials: [],
  faq: [],
  blog: [],
  contactInfo: null,
  socialLinks: [],
  loading: true,
});

export function usePortfolioData() {
  return useContext(DataContext);
}

function isSectionEnabled(
  sections: Record<string, unknown> | undefined,
  key: string
): boolean {
  if (!sections) return true;
  const value = sections[key];
  if (typeof value === "boolean") return value;
  if (typeof value === "object" && value !== null) {
    const enabled = (value as { enabled?: unknown }).enabled;
    return enabled !== false && enabled !== "false";
  }
  return true;
}

interface DataProviderProps {
  children: ReactNode;
  initialData?: PortfolioData;
}

export function DataProvider({ children, initialData }: DataProviderProps) {
  const [data, setData] = useState<PortfolioData>(
    initialData ?? {
      sectionsConfig: null,
      hero: null,
      about: null,
      skills: [],
      services: null,
      experience: [],
      education: [],
      projects: [],
      testimonials: [],
      faq: [],
      blog: [],
      contactInfo: null,
      socialLinks: [],
      loading: true,
    }
  );

  useEffect(() => {
    if (initialData) return;
    let cancelled = false;

    async function loadAll() {
      try {
        // 1. Fetch sections config first
        let sectionsConfig: SectionsConfigData | null = null;
        try {
          sectionsConfig = await getSectionsConfig();
        } catch {
          // If config fetch fails, fetch everything (safe fallback)
        }

        if (cancelled) return;

        const sections = sectionsConfig?.sections;
        const enabled = (key: string) => isSectionEnabled(sections, key);

        // 2. Fetch all enabled data in parallel
        const fetches: Promise<unknown>[] = [];
        const keys: string[] = [];

        if (enabled("hero")) {
          fetches.push(getHero().catch(() => null));
          keys.push("hero");
        }
        if (enabled("about")) {
          fetches.push(getAbout().catch(() => null));
          keys.push("about");
        }
        if (enabled("skills")) {
          fetches.push(getSkills().catch(() => []));
          keys.push("skills");
        }
        if (enabled("services")) {
          fetches.push(getServices().catch(() => null));
          keys.push("services");
        }
        if (enabled("experience")) {
          fetches.push(getExperience().catch(() => []));
          keys.push("experience");
        }
        if (enabled("education")) {
          fetches.push(getEducation().catch(() => []));
          keys.push("education");
        }
        if (enabled("projects-metadata")) {
          fetches.push(getProjects().catch(() => []));
          keys.push("projects");
        }
        if (enabled("testimonials")) {
          fetches.push(getTestimonials().catch(() => []));
          keys.push("testimonials");
        }
        if (enabled("faq")) {
          fetches.push(getFAQ().catch(() => []));
          keys.push("faq");
        }
        if (enabled("blog")) {
          fetches.push(getBlogPosts().catch(() => []));
          keys.push("blog");
        }
        if (enabled("contact-info")) {
          fetches.push(getContactInfo().catch(() => null));
          keys.push("contactInfo");
        }
        if (enabled("social-links")) {
          fetches.push(getSocialLinks().catch(() => []));
          keys.push("socialLinks");
        }

        const results = await Promise.all(fetches);

        if (cancelled) return;

        // 3. Map results back to state
        const mapped: Partial<PortfolioData> = { sectionsConfig };
        keys.forEach((key, i) => {
          (mapped as Record<string, unknown>)[key] = results[i];
        });

        setData({
          sectionsConfig: mapped.sectionsConfig ?? null,
          hero: (mapped.hero as HeroData) ?? null,
          about: (mapped.about as AboutData) ?? null,
          skills: (mapped.skills as SkillData[]) ?? [],
          services: (mapped.services as ServicesData) ?? null,
          experience: (mapped.experience as ExperienceData[]) ?? [],
          education: (mapped.education as EducationData[]) ?? [],
          projects: (mapped.projects as ProjectData[]) ?? [],
          testimonials: (mapped.testimonials as TestimonialData[]) ?? [],
          faq: (mapped.faq as FAQData[]) ?? [],
          blog: (mapped.blog as BlogPostData[]) ?? [],
          contactInfo: (mapped.contactInfo as ContactInfoData) ?? null,
          socialLinks: (mapped.socialLinks as SocialLinkData[]) ?? [],
          loading: false,
        });
      } catch {
        if (!cancelled) {
          setData((prev) => ({ ...prev, loading: false }));
        }
      }
    }

    loadAll();
    return () => {
      cancelled = true;
    };
  }, [initialData]);

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
}
