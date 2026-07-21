"use client";

import { useState, useEffect } from "react";
import { getProjects, type ProjectData } from "@/lib/api";

export default function ProjectsSection() {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects()
      .then(setProjects)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section id="projects" className="py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="size-6 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      </section>
    );
  }

  if (!projects.length) return null;

  return (
    <section id="projects" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-16">
          <p className="text-sm font-mono text-accent mb-3">WORK</p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold">
            Projects
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects
            .sort((a, b) => (a.isFeatured === b.isFeatured ? 0 : a.isFeatured ? -1 : 1))
            .map((project) => (
              <div
                key={project.id}
                className="group bg-surface border border-border rounded-2xl overflow-hidden hover:border-accent/30 transition-colors"
              >
                {project.thumbnailUrl && (
                  <div className="aspect-video overflow-hidden bg-bg">
                    <img
                      src={project.thumbnailUrl}
                      alt={project.title}
                      className="size-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                )}

                <div className="p-5">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="font-display font-semibold">{project.title}</h3>
                    {project.isFeatured && (
                      <span className="text-[10px] font-mono text-accent bg-accent/10 px-1.5 py-0.5 rounded shrink-0">
                        Featured
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-text-secondary mb-3 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-[11px] font-mono bg-surface-hover text-text-muted rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-text-muted">
                      {project.githubStats && (
                        <>
                          {project.githubStats.primaryLanguage && (
                            <span className="flex items-center gap-1">
                              <span
                                className="size-2 rounded-full"
                                style={{
                                  backgroundColor:
                                    project.githubStats.primaryLanguage.color,
                                }}
                              />
                              {project.githubStats.primaryLanguage.name}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                            >
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                            {project.githubStats.stars}
                          </span>
                        </>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-text-muted hover:text-accent transition-colors"
                          aria-label="Live demo"
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
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
                          className="text-text-muted hover:text-accent transition-colors"
                          aria-label="View source"
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
