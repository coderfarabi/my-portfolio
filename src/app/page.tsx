import type { Metadata } from "next";
import { fetchSectionsConfig } from "@/modules/sections-config/sections-config.repository";
import { fetchHero } from "@/modules/hero/hero.repository";
import { fetchAbout } from "@/modules/about/about.repository";
import { fetchSkills, fetchServices } from "@/modules/skills/skills.repository";
import { fetchExperiences } from "@/modules/experience/experience.repository";
import { fetchEducation } from "@/modules/education/education.repository";
import { fetchProjectsMetadata } from "@/modules/projects/projects.repository";
import { fetchTestimonials } from "@/modules/testimonials/testimonials.repository";
import { fetchFAQ } from "@/modules/faq/faq.repository";
import { fetchBlogPosts } from "@/modules/blog/blog.repository";
import { fetchContactInfo } from "@/modules/contact/contact.repository";
import { fetchSocialLinks } from "@/modules/social-links/social-links.repository";
import type { PortfolioData } from "@/context/DataContext";
import PortfolioClient from "@/components/PortfolioClient";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SocialSidebar from "@/components/SocialSidebar";
import { LazySection } from "@/components/LazySections";

const DEFAULT_ORDER = [
  "hero",
  "about",
  "services",
  "skills",
  "experience",
  "education",
  "projects-metadata",
  "testimonials",
  "faq",
  "blog",
  "contact-info",
  "newsletter",
];

const EAGER_COMPONENTS: Record<string, () => React.JSX.Element | null> = {
  hero: HeroSection,
};

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

export async function generateMetadata(): Promise<Metadata> {
  const hero = await fetchHero().catch(() => null);
  return {
    title: hero?.siteTitle || "Portfolio",
    description: hero?.subtitle || "Software engineer & full-stack developer portfolio",
    icons: hero?.faviconUrl ? { icon: hero.faviconUrl } : undefined,
  };
}

export default async function Home() {
  const sectionsConfig = await fetchSectionsConfig().catch(() => null);
  const sections = sectionsConfig?.sections;
  const enabled = (key: string) => isSectionEnabled(sections, key);

  const [hero, about, skills, services, experience, education, projectsMetadata, testimonials, faq, blog, contactInfo, socialLinks] =
    await Promise.all([
      enabled("hero") ? fetchHero().catch(() => null) : null,
      enabled("about") ? fetchAbout().catch(() => null) : null,
      enabled("skills") ? fetchSkills().catch(() => []) : [],
      enabled("services") ? fetchServices().catch(() => null) : null,
      enabled("experience") ? fetchExperiences().catch(() => []) : [],
      enabled("education") ? fetchEducation().catch(() => []) : [],
      enabled("projects-metadata") ? fetchProjectsMetadata().catch(() => []) : [],
      enabled("testimonials") ? fetchTestimonials().catch(() => []) : [],
      enabled("faq") ? fetchFAQ().catch(() => []) : [],
      enabled("blog") ? fetchBlogPosts().catch(() => []) : [],
      enabled("contact-info") ? fetchContactInfo().catch(() => null) : null,
      enabled("social-links") ? fetchSocialLinks().catch(() => []) : [],
    ]);

  const initialData: PortfolioData = {
    sectionsConfig: sectionsConfig as PortfolioData["sectionsConfig"],
    hero,
    about,
    skills,
    services,
    experience,
    education,
    projects: (projectsMetadata ?? []).map((p) => ({
      ...p,
      id: p.id ?? "",
      githubStats: null,
    })),
    testimonials,
    faq,
    blog,
    contactInfo,
    socialLinks,
    loading: false,
  };

  const show = (key: string) => {
    const value: unknown = sectionsConfig?.sections?.[key];
    if (typeof value === "boolean") return value;
    if (value === "false" || value === false) return false;
    if (value === "true") return true;
    if (value && typeof value === "object") {
      const e = (value as { enabled?: unknown }).enabled;
      return e !== false && e !== "false";
    }
    return true;
  };

  const getSectionOrder = (): string[] => {
    const secs = sectionsConfig?.sections;
    if (!secs) return DEFAULT_ORDER;

    const entries = Object.entries(secs);
    const hasOrder = entries.some(
      ([, value]) => typeof value === "object" && value !== null && value.order !== undefined
    );

    if (!hasOrder) {
      return DEFAULT_ORDER.filter((key) => key in secs);
    }

    const defaultIndex = (key: string) => {
      const i = DEFAULT_ORDER.indexOf(key);
      return i === -1 ? Infinity : i;
    };

    const orderOf = (value: unknown): number =>
      typeof value === "object" && value !== null && (value as { order?: unknown }).order !== undefined
        ? Number((value as { order: number }).order)
        : Infinity;

    const sorted = entries
      .map(([key, value]) => ({ key, value }))
      .sort((a, b) => {
        const orderDiff = orderOf(a.value) - orderOf(b.value);
        if (orderDiff !== 0) return orderDiff;
        const defaultDiff = defaultIndex(a.key) - defaultIndex(b.key);
        if (defaultDiff !== 0) return defaultDiff;
        return a.key.localeCompare(b.key);
      })
      .map(({ key }) => key);

    const known = new Set(sorted);
    DEFAULT_ORDER.forEach((key) => {
      if (!known.has(key)) sorted.push(key);
    });

    return sorted.filter((key) => key !== "footer");
  };

  const orderedSections = getSectionOrder();

  return (
    <PortfolioClient initialData={initialData}>
      <Header />
      <SocialSidebar />
      <main>
        {orderedSections.map((key) => {
          if (!show(key)) return null;
          const EagerComponent = EAGER_COMPONENTS[key];
          if (EagerComponent) return <EagerComponent key={key} />;
          return <LazySection key={key} sectionKey={key} />;
        })}
      </main>
      {show("footer") && <LazySection sectionKey="footer" />}
    </PortfolioClient>
  );
}
