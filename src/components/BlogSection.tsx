"use client";

import { motion } from "framer-motion";

interface BlogPost {
  category: string;
  date: string;
  title: string;
  excerpt: string;
  slug: string;
}

const posts: BlogPost[] = [
  {
    category: "Insights",
    date: "Apr 30, 2025",
    title: "5 Design Trends That Will Define 2026",
    excerpt:
      "Explore the top design trends for 2026 that will influence web, UI/UX, and branding projects, helping you stay ahead of the curve.",
    slug: "design-trends-2026",
  },
  {
    category: "Tutorials",
    date: "Apr 27, 2025",
    title: "How to Streamline Your Design Workflow",
    excerpt:
      "Discover practical strategies to improve your design process, save time, and deliver quality work more efficiently.",
    slug: "streamline-design-workflow",
  },
  {
    category: "Development",
    date: "Apr 20, 2025",
    title: "Building Performant React Apps in 2026",
    excerpt:
      "Learn about the latest performance optimization techniques for React applications, from server components to streaming SSR.",
    slug: "performant-react-apps",
  },
];

export default function BlogSection() {
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
    <section id="blog" className="section-wrapper border-t border-[var(--color-border)] bg-[var(--color-bg)]">
      <div className="container-wide">
        
        {/* Section Header */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="section-label mb-4">Journal</p>
            <h2 className="display-lg">
              Latest <span className="text-[var(--color-accent)]">Insights</span>
            </h2>
          </div>
          <p className="text-[var(--color-text-secondary)] font-light max-w-sm leading-relaxed text-sm md:text-base">
            Exploring concepts in modern design, performance optimization, and front-end architectures.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {posts.map((post, index) => {
            const num = String(index + 1).padStart(2, "0");
            return (
              <motion.article
                key={post.slug}
                variants={itemVariants}
                className="card-base p-8 flex flex-col justify-between min-h-[300px]"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[var(--color-text-muted)] font-mono text-xs uppercase tracking-widest">
                      {num} / Article
                    </span>
                    <span className="font-mono text-[10px] text-[var(--color-text-muted)]">
                      {post.date}
                    </span>
                  </div>

                  <span className="text-[10px] font-mono text-[var(--color-accent)] uppercase tracking-widest block mb-2">
                    {post.category}
                  </span>

                  <h3 className="text-lg md:text-xl font-display font-bold text-[var(--color-text)] uppercase tracking-wide mb-3 leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-sm text-[var(--color-text-secondary)] mb-6 font-light leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <a
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-xs font-mono text-[var(--color-accent)] hover:text-white transition-colors group mt-4 pt-4 border-t border-[var(--color-border)]"
                >
                  Read Article
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transform transition-transform duration-200 group-hover:translate-x-1"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              </motion.article>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
