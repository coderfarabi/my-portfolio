"use client";

import { motion } from "framer-motion";
import { usePortfolioData } from "@/context/DataContext";
import type { TechnologyItemData } from "@/lib/api";

function normalizeTechnologies(tech: unknown): TechnologyItemData[] {
  if (Array.isArray(tech)) return tech;
  if (typeof tech === "string") {
    if (tech.startsWith("[")) {
      try {
        const parsed = JSON.parse(tech);
        if (Array.isArray(parsed)) return parsed;
      } catch {}
    }
    return tech.split(", ").filter(Boolean).map((name) => ({ name }));
  }
  return [];
}

const CATEGORY_ICONS: Record<string, string> = {
  Languages: "M13 10V3L4 14h7v7l9-11h-7z",
  Frontend: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  Backend: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
  "Backend & AI": "M12 2a10 10 0 100 20 10 10 0 000-20zm0 4v4l3 3",
  Databases: "M12 2C6.48 2 2 4.02 2 6.5v11C2 19.98 6.48 22 12 22s10-2.02 10-4.5v-11C22 4.02 17.52 2 12 2zm0 2c4.42 0 8 1.79 8 4s-3.58 4-8 4-8-1.79-8-4 3.58-4 8-4zm0 14c-4.42 0-8-1.79-8-4v-3.05c1.56.86 4.56 1.55 8 1.55s6.44-.69 8-1.55V16c0 2.21-3.58 4-8 4zm0-6c-4.42 0-8-1.79-8-4V8.95c1.56.86 4.56 1.55 8 1.55s6.44-.69 8-1.55V10c0 2.21-3.58 4-8 4z",
  Mobile: "M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7c0-2-1-3-3-3H7C5 4 4 5 4 7z M8 4v2h8V4",
  DevOps: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  "Data Science": "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l3 3 7-7 M17 10V7h-3",
  UI: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  "UI/UX": "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
};

export default function SkillsSection() {
  const { services, loading } = usePortfolioData();

  if (loading) {
    return (
      <section id="skills" className="section-wrapper bg-[var(--color-bg)]">
        <div className="container-wide text-center">
          <div className="size-8 border-2 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      </section>
    );
  }

  const items = services?.services && services.services.length > 0
    ? services.services
    : null;

  if (!items) return null;

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
    <section id="skills" className="section-wrapper border-t border-[var(--color-border)] bg-[var(--color-bg)]">
      <div className="container-wide">

        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="section-label mb-4">What I know</p>
            <h2 className="display-lg">
              Technical <span className="text-[var(--color-accent)]">Skills</span>
            </h2>
          </div>
          <p className="text-[var(--color-text-secondary)] font-light max-w-sm leading-relaxed text-sm md:text-base">
            {services?.description || "Providing intelligent, modern software solutions built with strong fundamentals, clean architecture, and practical AI integration."}
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {items.map((item, index) => {
            const category = item.name;
            const techList = normalizeTechnologies(item.technologies);
            const num = String(index + 1).padStart(2, "0");
            return (
              <motion.div
                key={category}
                variants={itemVariants}
                className="card-base p-8 flex flex-col justify-between min-h-[320px]"
              >
                <div>
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

                  <h3 className="text-xl font-display font-bold text-[var(--color-text)] mb-3 uppercase tracking-wide">
                    {category}
                  </h3>

                  <p className="text-sm text-[var(--color-text-secondary)] mb-8 leading-relaxed font-light">
                    {item.description || `${category} tools and technologies.`}
                  </p>
                </div>

                {techList.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {techList.map((tech) => (
                      <span key={tech.name} className="tag-neutral text-[10px]">
                        {tech.name}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
