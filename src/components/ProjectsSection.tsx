"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getProjects, type ProjectData } from "@/lib/api";

export default function ProjectsSection() {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects()
      .then(setProjects)
      .catch((err) => console.error("Error loading projects:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section id="projects" className="section-wrapper bg-[var(--color-bg)]">
        <div className="container-wide text-center">
          <div className="size-8 border-2 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      </section>
    );
  }

  if (!projects.length) return null;

  // Prioritize featured projects
  const sorted = [...projects].sort((a, b) =>
    a.isFeatured === b.isFeatured ? 0 : a.isFeatured ? -1 : 1
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="projects" className="section-wrapper border-t border-[var(--color-border)] bg-[var(--color-bg)]">
      <div className="container-wide">
        
        {/* Section Header */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="section-label mb-4">Portfolio</p>
            <h2 className="display-lg">
              Featured <span className="text-[var(--color-accent)]">Works</span>
            </h2>
          </div>
          <p className="text-[var(--color-text-secondary)] font-light max-w-sm leading-relaxed text-sm md:text-base">
            A hand-picked selection of full-stack systems, tools, and UI engineering experiments.
          </p>
        </div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {sorted.map((project, index) => {
            const num = String(index + 1).padStart(2, "0");
            return (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className="card-base overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {/* Thumbnail / Visual */}
                  {project.thumbnailUrl ? (
                    <div className="aspect-[16/10] overflow-hidden bg-[var(--color-surface-2)] relative border-b border-[var(--color-border)]">
                      <img
                        src={project.thumbnailUrl}
                        alt={project.title}
                        className="size-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        loading="lazy"
                      />
                      
                      {project.isFeatured && (
                        <div className="absolute top-4 right-4">
                          <span className="tag text-[9px] bg-black/60 backdrop-blur-md">
                            Featured
                          </span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="aspect-[16/10] bg-[var(--color-surface-2)] flex items-center justify-center border-b border-[var(--color-border)]">
                      <span className="font-display text-4xl text-[var(--color-text-muted)] tracking-wider">
                        {num}
                      </span>
                    </div>
                  )}

                  {/* Body Content */}
                  <div className="p-8">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[10px] font-mono text-[var(--color-accent)] uppercase tracking-widest">
                        {project.category}
                      </span>
                    </div>

                    <h3 className="text-xl font-display font-bold text-[var(--color-text)] uppercase tracking-wide mb-3">
                      {project.title}
                    </h3>

                    <p className="text-sm text-[var(--color-text-secondary)] mb-6 line-clamp-3 font-light leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tag Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="tag-neutral text-[9px] py-0.5 px-2">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Metrics & CTAs */}
                <div className="px-8 pb-8 pt-4 border-t border-[var(--color-border)] flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs font-mono text-[var(--color-text-muted)]">
                    {project.githubStats && (
                      <>
                        {project.githubStats.primaryLanguage && (
                          <span className="flex items-center gap-1.5">
                            <span
                              className="size-2 rounded-full inline-block"
                              style={{ backgroundColor: project.githubStats.primaryLanguage.color }}
                            />
                            {project.githubStats.primaryLanguage.name}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                          {project.githubStats.stars}
                        </span>
                      </>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors p-1"
                        aria-label="Live Demo"
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                      </a>
                    )}
                    {project.githubStats?.url && (
                      <a
                        href={project.githubStats.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors p-1"
                        aria-label="Source Repository"
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
