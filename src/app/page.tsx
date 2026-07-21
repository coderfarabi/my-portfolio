"use client";

import { useState, useEffect } from "react";
import { getSectionsConfig, type SectionsConfigData } from "@/lib/api";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import ExperienceSection from "@/components/ExperienceSection";
import EducationSection from "@/components/EducationSection";
import ProjectsSection from "@/components/ProjectsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import BlogSection from "@/components/BlogSection";
import ContactSection from "@/components/ContactSection";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";

export default function Home() {
  const [config, setConfig] = useState<SectionsConfigData | null>(null);

  useEffect(() => {
    getSectionsConfig().then(setConfig).catch(() => {});
  }, []);

  const show = (key: string) => config?.sections?.[key] !== false;

  return (
    <>
      <Header />
      <main>
        {show("hero") && <HeroSection />}
        {show("about") && <AboutSection />}
        {show("services") && <ServicesSection />}
        {show("experience") && <ExperienceSection />}
        {show("education") && <EducationSection />}
        {show("projects-metadata") && <ProjectsSection />}
        {show("testimonials") && <TestimonialsSection />}
        {show("faq") && <FAQSection />}
        {show("blog") && <BlogSection />}
        {show("contact-info") && <ContactSection />}
        {show("newsletter") && <NewsletterSection />}
      </main>
      {show("footer") && <Footer />}
    </>
  );
}
