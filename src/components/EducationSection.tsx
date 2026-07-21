"use client";

import { useState, useEffect } from "react";
import { getEducation, type EducationData } from "@/lib/api";

export default function EducationSection() {
  const [education, setEducation] = useState<EducationData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEducation()
      .then(setEducation)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section id="education" className="py-24 sm:py-32 bg-surface/50">
        <div className="mx-auto max-w-6xl px-6">
          <div className="size-6 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      </section>
    );
  }

  if (!education.length) return null;

  return (
    <section id="education" className="py-24 sm:py-32 bg-surface/50">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-16">
          <p className="text-sm font-mono text-accent mb-3">ACADEMICS</p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold">
            Education
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {education.map((edu) => (
            <div
              key={edu.id || edu.institution + edu.degree}
              className="bg-bg border border-border rounded-2xl p-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                <div>
                  <h3 className="font-display font-semibold text-lg">
                    {edu.degree}
                  </h3>
                  <p className="text-accent text-sm">{edu.fieldOfStudy}</p>
                </div>
                {edu.isCurrent && (
                  <span className="text-xs font-mono text-accent bg-accent/10 px-2 py-0.5 rounded-full w-fit shrink-0">
                    In progress
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-text-muted mb-3">
                {edu.institutionUrl ? (
                  <a
                    href={edu.institutionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:text-accent-hover transition-colors"
                  >
                    {edu.institution}
                  </a>
                ) : (
                  <span>{edu.institution}</span>
                )}
                <span>{edu.location}</span>
                <span className="font-mono">
                  {formatDate(edu.startDate)} —{" "}
                  {edu.isCurrent ? "Present" : formatDate(edu.endDate!)}
                </span>
              </div>

              {edu.grade && (
                <p className="text-sm text-text-secondary mb-2">
                  Grade: {edu.grade}
                </p>
              )}

              {edu.description && (
                <p className="text-sm text-text-secondary">{edu.description}</p>
              )}

              {edu.activities && edu.activities.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {edu.activities.map((act) => (
                    <span
                      key={act}
                      className="px-2.5 py-1 text-xs font-mono bg-surface-hover text-text-muted rounded-lg"
                    >
                      {act}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
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
