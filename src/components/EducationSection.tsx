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

export default function EducationSection() {
  const { education, loading } = usePortfolioData();

  if (loading) {
    return (
      <section id="education" className="section-wrapper bg-[var(--color-bg)]">
        <div className="container-wide text-center">
          <div className="size-8 border-2 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      </section>
    );
  }

  if (!education.length) return null;

  return (
    <section id="education" className="section-wrapper border-t border-[var(--color-border)] bg-[var(--color-bg)]">
      <div className="container-wide">
        
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="section-label mb-4">Academics</p>
            <h2 className="display-lg">
              Education <span className="text-[var(--color-accent)]">History</span>
            </h2>
          </div>
          <p className="text-[var(--color-text-secondary)] font-light max-w-sm leading-relaxed text-sm md:text-base min-h-[3rem]">
            Formal education, academic research focus areas, and institutional activities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {education.map((edu, index) => {
            const num = String(index + 1).padStart(2, "0");
            return (
              <motion.div
                key={edu.id || edu.institution + edu.degree}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="card-base p-8 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[var(--color-text-muted)] font-mono text-xs uppercase tracking-widest">
                      {num} / Education
                    </span>
                    <span className="font-mono text-[10px] text-[var(--color-text-secondary)] bg-[var(--color-surface-2)] border border-[var(--color-border)] px-3 py-1 rounded-full">
                      {formatDate(edu.startDate)} — {edu.isCurrent ? "Present" : formatDate(edu.endDate!)}
                    </span>
                  </div>

                  <h3 className="text-lg md:text-xl font-display font-bold text-[var(--color-text)] uppercase tracking-wide mb-1">
                    {edu.degree}
                  </h3>
                  
                  <div className="text-[var(--color-accent)] font-mono text-xs uppercase tracking-wider mb-4">
                    {edu.fieldOfStudy}
                  </div>

                  <div className="mb-4 text-xs text-[var(--color-text-muted)]">
                    {edu.institutionUrl ? (
                      <a
                        href={edu.institutionUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[var(--color-accent)] transition-colors"
                      >
                        @{edu.institution}
                      </a>
                    ) : (
                      <span>@{edu.institution}</span>
                    )}
                    <span className="mx-2">&middot;</span>
                    <span>{edu.location}</span>
                  </div>

                  {edu.grade && (
                    <div className="text-xs text-[var(--color-text-secondary)] mb-4 bg-[var(--color-surface-2)] p-2.5 rounded-lg border border-[var(--color-border)] inline-block">
                      <span className="font-mono text-[var(--color-text-muted)]">Grade:</span> {edu.grade}
                    </div>
                  )}

                  {edu.description && (
                    <p className="text-sm text-[var(--color-text-secondary)] font-light leading-relaxed mb-6">
                      {edu.description}
                    </p>
                  )}
                </div>

                {edu.activities && edu.activities.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[var(--color-border)]">
                    {edu.activities.map((act) => (
                      <span key={act} className="tag-neutral text-[10px]">
                        {act}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
