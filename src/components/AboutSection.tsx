"use client";

import { useState, useEffect } from "react";
import { getAbout, type AboutData } from "@/lib/api";

export default function AboutSection() {
  const [about, setAbout] = useState<AboutData | null>(null);

  useEffect(() => {
    getAbout().then(setAbout).catch(() => {});
  }, []);

  if (!about) return null;

  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col md:flex-row items-start gap-12">
          <div className="shrink-0">
            <div className="relative size-40 sm:size-48 rounded-2xl overflow-hidden bg-surface border border-border">
              {about.avatarUrl ? (
                <img
                  src={about.avatarUrl}
                  alt={about.name}
                  className="size-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="size-full flex items-center justify-center text-text-muted font-display text-4xl">
                  {about.name.charAt(0)}
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl sm:text-3xl font-display font-bold">
                {about.name}
              </h2>
              {about.openToWork && (
                <span className="px-3 py-1 text-xs font-medium bg-success/10 text-success rounded-full border border-success/20">
                  Open to work
                </span>
              )}
            </div>
            <p className="text-accent font-medium mb-4">{about.tagline}</p>
            <p className="text-text-secondary leading-relaxed mb-6">
              {about.bio}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-sm text-text-muted">
              <span className="flex items-center gap-2">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {about.location}
              </span>
              <span className="flex items-center gap-2">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                  <path d="M8 21h8" />
                  <path d="M12 17v4" />
                </svg>
                {about.yearsOfExperience}+ years
              </span>
              {about.resumeUrl && (
                <a
                  href={about.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-accent hover:text-accent-hover transition-colors"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                  Resume
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
