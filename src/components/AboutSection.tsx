"use client";

import { motion } from "framer-motion";
import { usePortfolioData } from "@/context/DataContext";

export default function AboutSection() {
  const { about, loading } = usePortfolioData();

  if (loading) {
    return (
      <section id="about" className="section-wrapper bg-[var(--color-bg)]">
        <div className="container-wide text-center">
          <div className="size-8 border-2 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      </section>
    );
  }

  if (!about) return null;

  return (
    <section id="about" className="section-wrapper border-t border-[var(--color-border)] bg-[var(--color-bg)]">
      <div className="container-wide">
        
        <div className="mb-16 md:mb-24">
          <p className="section-label mb-4">Biography</p>
          <h2 className="display-lg">
            About <span className="text-[var(--color-accent)]">Me</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          <div className="lg:col-span-12 max-w-3xl flex flex-col gap-6">
            <h3 className="text-2xl md:text-3xl font-display font-bold text-[var(--color-text)] leading-snug">
              {about.tagline}
            </h3>
            
            <p className="text-[var(--color-text-secondary)] leading-relaxed text-base md:text-lg max-w-2xl font-light">
              {about.bio}
            </p>

            <div className="flex flex-wrap items-center gap-6 mt-4">
              <span className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] font-mono">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {about.location}
              </span>
              
              {about.resumeUrl && (
                <a
                  href={about.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost text-xs py-2 px-5"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1 inline-block">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                  </svg>
                  Get Resume
                </a>
              )}
            </div>
          </div>

        </div>

        {about.showStats !== false && about.stats && about.stats.length > 0 && (
          <div className="mt-16 grid grid-cols-1 gap-px bg-[var(--color-border)] rounded-2xl overflow-hidden border border-[var(--color-border)] max-w-4xl mx-auto">
            {about.stats.map((stat) => (
              <div
                key={stat.number ?? stat.label}
                className="bg-[var(--color-surface)] p-8 flex flex-col justify-between min-h-[140px]"
              >
                <span className="text-[var(--color-text-muted)] font-mono text-xs uppercase tracking-widest">
                  {stat.number ? `${stat.number} / ` : ""}{stat.label}
                </span>
                <div className="flex items-baseline gap-2 mt-4 flex-wrap">
                  <span
                    className={`font-display font-bold text-[var(--color-accent)] uppercase ${stat.value.length <= 4 ? "text-5xl md:text-6xl" : "text-3xl md:text-4xl"}`}
                  >
                    {stat.value}
                  </span>
                  {stat.description && (
                    <span className="text-[var(--color-text-secondary)] text-xs">
                      {stat.description}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
