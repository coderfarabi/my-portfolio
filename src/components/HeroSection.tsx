"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
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
      } catch { }
    }
    return tech.split(", ").filter(Boolean).map((name) => ({ name }));
  }
  return [];
}

export default function HeroSection() {
  const { hero, about, services, loading } = usePortfolioData();
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [marqueeDuration, setMarqueeDuration] = useState(30);

  useEffect(() => {
    if (!marqueeRef.current) return;
    const totalWidth = marqueeRef.current.scrollWidth;
    const halfWidth = totalWidth / 2;
    setMarqueeDuration(Math.max(4, halfWidth / 2000));
  }, [services]);

  if (loading) {
    return (
      <section id="hero" className="min-h-screen flex items-center justify-center bg-[var(--color-bg)]">
        <div className="size-8 border-2 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin" />
      </section>
    );
  }

  if (!hero) return null;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between overflow-hidden pt-24 md:pt-32 pb-12 bg-[var(--color-bg)]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(208,255,113,0.07),transparent)] pointer-events-none" />
      <div className="absolute top-1/4 left-10 size-[300px] bg-[var(--color-accent)]/2 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 w-full my-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          <div className="lg:col-span-7 flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="section-label"
            >
              {hero.greeting}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="display-xl"
            >
              {hero.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl md:text-2xl text-[var(--color-text-secondary)] font-light leading-relaxed max-w-xl"
            >
              {hero.title}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-sm md:text-base text-[var(--color-text-muted)] max-w-lg leading-relaxed"
            >
              {hero.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap items-center gap-4 mt-2"
            >
              <a href={hero.ctaPrimaryUrl} className="btn-primary">
                {hero.ctaPrimaryLabel}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 7h12M7 1l6 6-6 6" />
                </svg>
              </a>
              <a href={hero.ctaSecondaryUrl} className="btn-ghost">
                {hero.ctaSecondaryLabel}
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col items-center lg:items-end"
          >
            <div className="relative group w-full max-w-[340px]">
              <div className="absolute inset-0 border border-[var(--color-accent)] rounded-3xl translate-x-3 translate-y-3 -z-10 transition-transform duration-300 group-hover:translate-x-1.5 group-hover:translate-y-1.5" />

              <div className="aspect-[4/5] w-full rounded-3xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)] relative">
                {about?.avatarUrl ? (
                  <Image
                    src={about.avatarUrl}
                    alt={hero.name}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 340px"
                    className="object-cover grayscale contrast-110 hover:grayscale-0 transition-all duration-500"
                  />
                ) : (
                  <div className="size-full flex items-center justify-center bg-[var(--color-surface-2)] text-[var(--color-text-muted)] font-display text-7xl">
                    P
                  </div>
                )}
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      <div className="w-full overflow-hidden border-y border-[var(--color-border)] py-6 mt-16 bg-[var(--color-surface)] relative">
        <div ref={marqueeRef} className="flex gap-16 whitespace-nowrap animate-marquee" style={{ animationDuration: `${marqueeDuration}s` }}>
          {(() => {
            const techs = services?.services
              ? services.services.flatMap((s) => normalizeTechnologies(s.technologies))
              : [];
            return Array(4).fill(techs).flat().map((tech, index) => {
              let hostname = "";
              if (tech.url) {
                try { hostname = new URL(tech.url).hostname; } catch { }
              }
              const content = (
                <>
                  {hostname && (
                    <img
                      src={`https://www.google.com/s2/favicons?domain=${hostname}&sz=64`}
                      alt={tech.name}
                      width={40}
                      height={40}
                      loading="lazy"
                      className="rounded-sm shrink-0"
                    />
                  )}
                  <span>{tech.name}</span>
                </>
              );
              const className = "flex items-center gap-3 text-xs font-mono tracking-widest text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors";
              return (
                <span key={index} className="flex items-center gap-16">
                  {tech.url ? (
                    <a href={tech.url} target="_blank" rel="noopener noreferrer" className={className}>
                      {content}
                    </a>
                  ) : (
                    <span className={className}>{content}</span>
                  )}
                  <span className="accent-dot" />
                </span>
              );
            });
          })()}
        </div>
      </div>
    </section>
  );
}
