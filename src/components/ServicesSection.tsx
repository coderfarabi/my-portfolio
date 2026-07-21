"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getSkills, type SkillData } from "@/lib/api";

const CATEGORY_ICONS: Record<string, string> = {
  "UI/UX": "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  Frontend: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  Backend: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
  Mobile: "M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7c0-2-1-3-3-3H7C5 4 4 5 4 7z M8 4v2h8V4",
  DevOps: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  "Data Science": "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l3 3 7-7 M17 10V7h-3",
};

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  "UI/UX": "User-centered visual systems, wireframing, interactive prototyping, and usability workflows.",
  Frontend: "Modern modular applications built with speed, accessibility, and high performance.",
  Backend: "Robust APIs, cloud architecture, system infrastructure, and relational/NoSQL databases.",
  Mobile: "Cross-platform mobile apps with native-level smooth micro-animations and layouts.",
  DevOps: "Automated pipelines, cloud integration, server telemetry, and containerized deployments.",
  "Data Science": "Statistical analysis, pipeline data integration, data cleaning, and custom ML algorithms.",
};

export default function ServicesSection() {
  const [skills, setSkills] = useState<SkillData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSkills()
      .then(setSkills)
      .catch((err) => console.error("Error loading skills:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section id="services" className="section-wrapper bg-[var(--color-bg)]">
        <div className="container-wide text-center">
          <div className="size-8 border-2 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      </section>
    );
  }

  if (!skills.length) return null;

  const grouped = skills.reduce<Record<string, SkillData[]>>((acc, skill) => {
    const cat = skill.category || "Other";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {});

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="services" className="section-wrapper border-t border-[var(--color-border)] bg-[var(--color-bg)]">
      <div className="container-wide">
        
        {/* Section Header */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="section-label mb-4">Core competencies</p>
            <h2 className="display-lg">
              What I <span className="text-[var(--color-accent)]">Offer</span>
            </h2>
          </div>
          <p className="text-[var(--color-text-secondary)] font-light max-w-sm leading-relaxed text-sm md:text-base">
            Providing custom digital solutions built on modern tech stacks, strict type systems, and rich visual aesthetics.
          </p>
        </div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {Object.entries(grouped).map(([category, categorySkills], index) => {
            const num = String(index + 1).padStart(2, "0");
            return (
              <motion.div
                key={category}
                variants={itemVariants}
                className="card-base p-8 flex flex-col justify-between min-h-[320px]"
              >
                <div>
                  {/* Card Header Info */}
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-[var(--color-text-muted)] font-mono text-xs uppercase tracking-widest">
                      {num} / {category}
                    </span>
                    <div className="size-10 rounded-full bg-[var(--color-surface-2)] flex items-center justify-center border border-[var(--color-border)]">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-[var(--color-accent)]"
                      >
                        <path d={CATEGORY_ICONS[category] || CATEGORY_ICONS.Frontend} />
                      </svg>
                    </div>
                  </div>

                  {/* Category Title */}
                  <h3 className="text-xl font-display font-bold text-[var(--color-text)] mb-3 uppercase tracking-wide">
                    {category}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[var(--color-text-secondary)] mb-8 leading-relaxed font-light">
                    {CATEGORY_DESCRIPTIONS[category] || `${category} development and integration.`}
                  </p>
                </div>

                {/* Subtech Pills */}
                <div className="flex flex-wrap gap-1.5">
                  {categorySkills
                    .sort((a, b) => (b.order ?? 0) - (a.order ?? 0))
                    .slice(0, 5)
                    .map((skill) => (
                      <span key={skill.name} className="tag-neutral text-[10px]">
                        {skill.name}
                      </span>
                    ))}
                  {categorySkills.length > 5 && (
                    <span className="tag-neutral text-[10px] bg-[var(--color-surface-hover)] border-dashed">
                      +{categorySkills.length - 5} More
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
