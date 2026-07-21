"use client";

import { motion } from "framer-motion";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "They truly understood my vision and turned it into an impactful product. The results went beyond my expectations!",
    author: "John Harris",
    role: "Marketing Director",
    rating: 5,
  },
  {
    quote:
      "They took the time to understand our goals and delivered a solution that resonated perfectly with our audience.",
    author: "Michael Lee",
    role: "Product Manager",
    rating: 5,
  },
  {
    quote:
      "Their design skills are unmatched. They transformed my ideas into a high-performing, visually striking website.",
    author: "Sarah Johnson",
    role: "CEO, TechStart",
    rating: 5,
  },
  {
    quote:
      "As a small business owner, I appreciated how stress-free they made the entire process from start to finish.",
    author: "Laura Bennett",
    role: "Small Business Owner",
    rating: 5,
  },
];

export default function TestimonialsSection() {
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
    <section id="testimonials" className="section-wrapper border-t border-[var(--color-border)] bg-[var(--color-bg)]">
      <div className="container-wide">
        
        {/* Section Header */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="section-label mb-4">Reviews</p>
            <h2 className="display-lg">
              Client <span className="text-[var(--color-accent)]">Feedback</span>
            </h2>
          </div>
          <p className="text-[var(--color-text-secondary)] font-light max-w-sm leading-relaxed text-sm md:text-base">
            What clients say about our UI aesthetics, modular development approach, and technical execution.
          </p>
        </div>

        {/* Testimonials List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"
        >
          {testimonials.map((t, index) => {
            const num = String(index + 1).padStart(2, "0");
            return (
              <motion.div
                key={t.author}
                variants={itemVariants}
                className="card-base p-8 flex flex-col justify-between min-h-[220px]"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[var(--color-text-muted)] font-mono text-xs uppercase tracking-widest">
                      {num} / Review
                    </span>
                    <div className="flex gap-0.5">
                      {Array.from({ length: t.rating }, (_, i) => (
                        <svg
                          key={i}
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="text-[var(--color-accent)]"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      ))}
                    </div>
                  </div>

                  <blockquote className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-6 font-light">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-[var(--color-border)]">
                  <div className="size-8 rounded-full bg-[var(--color-surface-2)] flex items-center justify-center text-[10px] font-display font-bold text-[var(--color-accent)] border border-[var(--color-border)]">
                    {t.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <div className="text-xs font-mono text-[var(--color-text)]">
                      {t.author}
                    </div>
                    <div className="text-[10px] text-[var(--color-text-muted)]">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Small Highlight Grid */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-2 gap-6 max-w-md mx-auto mt-16"
        >
          <div className="card-base p-6 text-center">
            <div className="text-3xl font-display font-bold text-[var(--color-accent)] mb-1">
              98%
            </div>
            <div className="text-xs text-[var(--color-text-muted)] font-mono uppercase tracking-wider">Satisfaction</div>
          </div>
          <div className="card-base p-6 text-center">
            <div className="text-3xl font-display font-bold text-[var(--color-accent)] mb-1">
              200%
            </div>
            <div className="text-xs text-[var(--color-text-muted)] font-mono uppercase tracking-wider">Client Growth</div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
