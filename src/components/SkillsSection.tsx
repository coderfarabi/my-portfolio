"use client";

import { useState, useEffect } from "react";
import { getSkills, type SkillData } from "@/lib/api";

const LEVEL_ORDER: Record<string, number> = {
  expert: 4,
  advanced: 3,
  intermediate: 2,
  beginner: 1,
};

const LEVEL_COLORS: Record<string, string> = {
  expert: "bg-accent",
  advanced: "bg-accent/70",
  intermediate: "bg-accent/40",
  beginner: "bg-accent/20",
};

export default function SkillsSection() {
  const [skills, setSkills] = useState<SkillData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSkills()
      .then(setSkills)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section id="skills" className="py-24 sm:py-32 bg-surface/50">
        <div className="mx-auto max-w-6xl px-6">
          <div className="size-6 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto" />
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

  return (
    <section id="skills" className="py-24 sm:py-32 bg-surface/50">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-16">
          <p className="text-sm font-mono text-accent mb-3">EXPERTISE</p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold">
            Skills & Technologies
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(grouped).map(([category, categorySkills]) => (
            <div
              key={category}
              className="bg-surface border border-border rounded-2xl p-6"
            >
              <h3 className="font-display font-semibold text-lg mb-4 text-accent">
                {category}
              </h3>
              <div className="space-y-4">
                {categorySkills
                  .sort((a, b) => (b.order ?? 0) - (a.order ?? 0))
                  .map((skill) => (
                    <div key={skill.name}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm text-text-secondary">
                          {skill.name}
                        </span>
                        <span className="text-xs text-text-muted font-mono uppercase">
                          {skill.level}
                        </span>
                      </div>
                      <div className="h-1.5 bg-bg rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${
                            LEVEL_COLORS[skill.level] || "bg-accent/20"
                          }`}
                          style={{
                            width: `${
                              ((LEVEL_ORDER[skill.level] || 1) / 4) * 100
                            }%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
