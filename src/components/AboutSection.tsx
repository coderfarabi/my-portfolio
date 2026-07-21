"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getAbout, type AboutData } from "@/lib/api";

export default function AboutSection() {
  const [about, setAbout] = useState<AboutData | null>(null);

  useEffect(() => {
    getAbout().then(setAbout).catch((err) => console.error("Error loading about:", err));
  }, []);

  if (!about) return null;

  return (
    <section id="about" className="section-wrapper border-t border-[var(--color-border)] bg-[var(--color-bg)]">
      <div className="container-wide">
        
        {/* Section Header */}
        <div className="mb-16 md:mb-24">
          <p className="section-label mb-4">Biography</p>
          <h2 className="display-lg">
            About <span className="text-[var(--color-accent)]">Me</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Bio text column */}
          <div className="lg:col-span-7 flex flex-col gap-6">
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

          {/* Stats column */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-px bg-[var(--color-border)] rounded-2xl overflow-hidden border border-[var(--color-border)]">
            
            {/* Stat Item 1 */}
            <div className="bg-[var(--color-surface)] p-8 flex flex-col justify-between min-h-[140px]">
              <span className="text-[var(--color-text-muted)] font-mono text-xs uppercase tracking-widest">
                01 / Experience
              </span>
              <div className="flex items-baseline gap-2 mt-4">
                <span className="text-5xl md:text-6xl font-display font-bold text-[var(--color-accent)]">
                  {about.yearsOfExperience}+
                </span>
                <span className="text-[var(--color-text-secondary)] text-sm">
                  Years working in the industry
                </span>
              </div>
            </div>

            {/* Stat Item 2 */}
            <div className="bg-[var(--color-surface)] p-8 flex flex-col justify-between min-h-[140px]">
              <span className="text-[var(--color-text-muted)] font-mono text-xs uppercase tracking-widest">
                02 / Delivery
              </span>
              <div className="flex items-baseline gap-2 mt-4">
                <span className="text-5xl md:text-6xl font-display font-bold text-[var(--color-accent)]">
                  50+
                </span>
                <span className="text-[var(--color-text-secondary)] text-sm">
                  Projects completed successfully
                </span>
              </div>
            </div>

            {/* Stat Item 3 */}
            <div className="bg-[var(--color-surface)] p-8 flex flex-col justify-between min-h-[140px]">
              <span className="text-[var(--color-text-muted)] font-mono text-xs uppercase tracking-widest">
                03 / Clients
              </span>
              <div className="flex items-baseline gap-2 mt-4">
                <span className="text-5xl md:text-6xl font-display font-bold text-[var(--color-accent)]">
                  10+
                </span>
                <span className="text-[var(--color-text-secondary)] text-sm">
                  Global collaborative clients
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
