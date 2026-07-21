"use client";

import { useState, useEffect } from "react";
import { getHero, type HeroData } from "@/lib/api";

export default function HeroSection() {
  const [hero, setHero] = useState<HeroData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getHero()
      .then(setHero)
      .catch(() => setLoading(false))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section
        id="hero"
        className="min-h-screen flex items-center justify-center"
      >
        <div className="size-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </section>
    );
  }

  if (!hero) return null;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-accent-dim/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 size-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <p className="text-sm font-mono text-accent mb-4 animate-fade-in-up">
          {hero.greeting}
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold leading-tight mb-6 animate-fade-in-up">
          {hero.highlightedWords ? (
            splitOnHighlight(hero.name, hero.highlightedWords).map(
              (part, i) =>
                hero.highlightedWords?.includes(part) ? (
                  <span key={i} className="text-accent">
                    {part}
                  </span>
                ) : (
                  <span key={i}>{part}</span>
                ),
            )
          ) : (
            <span>{hero.name}</span>
          )}
        </h1>
        <p className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto mb-4 animate-fade-in-up">
          {hero.title}
        </p>
        <p className="text-text-muted max-w-xl mx-auto mb-10 animate-fade-in-up">
          {hero.subtitle}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 animate-fade-in-up">
          <a
            href={hero.ctaPrimaryUrl}
            className="px-6 py-3 bg-accent text-bg font-medium rounded-xl hover:bg-accent-hover transition-colors"
          >
            {hero.ctaPrimaryLabel}
          </a>
          <a
            href={hero.ctaSecondaryUrl}
            className="px-6 py-3 border border-border text-text-secondary font-medium rounded-xl hover:border-text-muted hover:text-text transition-colors"
          >
            {hero.ctaSecondaryLabel}
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          className="text-text-muted"
        >
          <path
            d="M10 3v14m0 0l-6-6m6 6l6-6"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  );
}

function splitOnHighlight(text: string, highlights: string[]): string[] {
  const parts: string[] = [text];
  for (const h of highlights) {
    const idx = parts.findIndex((p) => p.includes(h));
    if (idx === -1) continue;
    const split = parts[idx].split(h);
    parts.splice(idx, 1, ...split.flatMap((s, i) => (i < split.length - 1 ? [s, h] : [s])));
  }
  return parts.filter(Boolean);
}
