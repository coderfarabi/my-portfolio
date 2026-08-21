"use client";

import { motion } from "framer-motion";
import { usePortfolioData } from "@/context/DataContext";

function formatDate(iso: string): string {
  if (iso === "Present") return "Present";
  const date = new Date(iso);
  if (isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("en-US", {
    year: "numeric",
  });
}

export default function ExperienceSection() {
  const { experience, about, loading } = usePortfolioData();

  if (loading) {
    return (
      <section id="experience" className="section-wrapper bg-[var(--color-bg)]">
        <div className="container-wide text-center">
          <div className="size-8 border-2 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      </section>
    );
  }

  if (!experience.length && !about) return null;

  return (
    <section id="experience" className="section-wrapper border-t border-[var(--color-border)] bg-[var(--color-bg)]">
      <div className="container-wide">
        
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="section-label mb-4">Journey</p>
            <h2 className="display-lg">
              Work <span className="text-[var(--color-accent)]">Experience</span>
            </h2>
          </div>
          <p className="text-[var(--color-text-secondary)] font-light max-w-sm leading-relaxed text-sm md:text-base min-h-[3rem]">
            A history of key roles, architectural contributions, and systems built across organizations.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto pl-6 md:pl-12 border-l border-[var(--color-border)] flex flex-col gap-16">
          {experience.map((exp, index) => (
            <motion.div
              key={exp.id || exp.role + exp.company}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="relative"
            >
              <div className="absolute -left-[31px] md:-left-[55px] top-1.5 size-2 bg-[var(--color-accent)] border-4 border-[var(--color-bg)] outline outline-1 outline-[var(--color-border)] rounded-full z-10" />

              <div className="card-base p-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div>
                    <span className="text-[var(--color-text-muted)] font-mono text-xs uppercase tracking-widest block mb-1">
                      {exp.locationType} / {exp.employmentType}
                    </span>
                    <h3 className="text-xl font-display font-bold text-[var(--color-text)] uppercase tracking-wide">
                      {exp.role}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-[var(--color-text-secondary)] bg-[var(--color-surface-2)] border border-[var(--color-border)] px-3 py-1 rounded-full">
                      {formatDate(exp.startDate)} — {exp.isCurrent ? "Present" : formatDate(exp.endDate!)}
                    </span>
                    {exp.isCurrent && (
                      <span className="tag text-[10px]">
                        Active
                      </span>
                    )}
                  </div>
                </div>

                <div className="mb-6 flex items-center gap-2">
                  {exp.companyUrl ? (
                    <a
                      href={exp.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-mono text-[var(--color-accent)] hover:underline"
                    >
                      @{exp.company}
                    </a>
                  ) : (
                    <span className="text-sm font-mono text-[var(--color-text-secondary)]">
                      @{exp.company}
                    </span>
                  )}
                  <span className="text-[var(--color-text-muted)] text-xs">&middot; {exp.location}</span>
                </div>

                <ul className="flex flex-col gap-3 mb-6">
                  {exp.description.map((point, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-sm text-[var(--color-text-secondary)] leading-relaxed font-light"
                    >
                      <span className="accent-dot mt-2" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[var(--color-border)]">
                  {exp.technologies.map((tech) => (
                    <span key={tech} className="tag-neutral text-[10px]">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
