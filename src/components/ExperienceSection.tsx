"use client";

import { useState, useEffect } from "react";
import { getExperience, type ExperienceData } from "@/lib/api";

export default function ExperienceSection() {
  const [experience, setExperience] = useState<ExperienceData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getExperience()
      .then(setExperience)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section id="experience" className="py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="size-6 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      </section>
    );
  }

  if (!experience.length) return null;

  return (
    <section id="experience" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-16">
          <p className="text-sm font-mono text-accent mb-3">CAREER</p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold">
            Experience
          </h2>
        </div>

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-[19px] top-2 bottom-2 w-px bg-border" />

          <div className="space-y-12">
            {experience.map((exp) => (
              <div key={exp.id || exp.role + exp.company} className="relative pl-12">
                <div className="absolute left-2.5 top-1.5 size-3 rounded-full bg-accent border-2 border-bg" />

                <div className="bg-surface border border-border rounded-2xl p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
                    <h3 className="font-display font-semibold text-lg">
                      {exp.role}
                    </h3>
                    {exp.isCurrent && (
                      <span className="text-xs font-mono text-success bg-success/10 px-2 py-0.5 rounded-full w-fit">
                        Current
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-text-muted mb-4">
                    {exp.companyUrl ? (
                      <a
                        href={exp.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:text-accent-hover transition-colors"
                      >
                        {exp.company}
                      </a>
                    ) : (
                      <span>{exp.company}</span>
                    )}
                    <span>{exp.location}</span>
                    <span className="font-mono">
                      {formatDate(exp.startDate)} —{" "}
                      {exp.isCurrent ? "Present" : formatDate(exp.endDate!)}
                    </span>
                  </div>

                  <ul className="space-y-2 mb-4">
                    {exp.description.map((point, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-text-secondary"
                      >
                        <span className="mt-1.5 size-1.5 rounded-full bg-text-muted shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 text-xs font-mono bg-surface-hover text-text-muted rounded-lg"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function formatDate(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
}
