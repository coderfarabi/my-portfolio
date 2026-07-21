"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getBlogPosts, type BlogPostData } from "@/lib/api";

export default function BlogSection() {
  const [posts, setPosts] = useState<BlogPostData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlogPosts()
      .then(setPosts)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="py-28 sm:py-36 bg-surface/50">
        <div className="mx-auto max-w-6xl px-6">
          <div className="size-6 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      </section>
    );
  }

  if (!posts.length) return null;

  return (
    <section className="py-28 sm:py-36 bg-surface/50">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="section-label">Blog</p>
          <h2 className="section-title">
            Insights & <span className="text-accent">Ideas</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {posts.map((post, index) => (
            <motion.article
              key={post.id || post.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="card p-6 flex flex-col"
            >
              <div className="flex items-center gap-3 text-xs text-text-muted mb-3">
                <span className="text-[11px] font-mono text-accent uppercase tracking-wider">
                  {post.category}
                </span>
                <span className="text-border">&middot;</span>
                <span className="font-mono text-xs">{post.date}</span>
              </div>

              <h3 className="font-display font-semibold text-base mb-2">
                {post.title}
              </h3>

              <p className="text-sm text-text-secondary leading-relaxed mb-5 flex-1">
                {post.excerpt}
              </p>

              <a
                href={`/blog/${post.slug}`}
                className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent-hover transition-colors mt-auto"
              >
                Read More
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
