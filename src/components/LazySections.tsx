"use client";

import { lazy, Suspense } from "react";

const AboutSection = lazy(() => import("@/components/AboutSection"));
const ServicesSection = lazy(() => import("@/components/ServicesSection"));
const ExperienceSection = lazy(() => import("@/components/ExperienceSection"));
const EducationSection = lazy(() => import("@/components/EducationSection"));
const ProjectsSection = lazy(() => import("@/components/ProjectsSection"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const FAQSection = lazy(() => import("@/components/FAQSection"));
const BlogSection = lazy(() => import("@/components/BlogSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const NewsletterSection = lazy(() => import("@/components/NewsletterSection"));
const SkillsSection = lazy(() => import("@/components/SkillsSection"));
const Footer = lazy(() => import("@/components/Footer"));

const LAZY_COMPONENTS: Record<string, React.LazyExoticComponent<() => React.JSX.Element | null>> = {
  about: AboutSection,
  services: ServicesSection,
  experience: ExperienceSection,
  education: EducationSection,
  "projects-metadata": ProjectsSection,
  testimonials: TestimonialsSection,
  faq: FAQSection,
  blog: BlogSection,
  "contact-info": ContactSection,
  newsletter: NewsletterSection,
  skills: SkillsSection,
  footer: Footer,
};

function SectionSpinner() {
  return (
    <div className="size-8 border-2 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin mx-auto" />
  );
}

export function LazySection({ sectionKey }: { sectionKey: string }): React.JSX.Element | null {
  const Component = LAZY_COMPONENTS[sectionKey];
  if (!Component) return null;

  return (
    <Suspense fallback={<SectionSpinner />}>
      <Component />
    </Suspense>
  );
}
