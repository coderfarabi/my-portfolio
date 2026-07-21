"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What services do you offer?",
    answer:
      "I offer a range of services including UI/UX design, frontend and backend development, mobile app development, and DevOps consulting. Each service is tailored to meet the specific needs of your project.",
  },
  {
    question: "How does the design process work?",
    answer:
      "My process begins with discovery and research, followed by wireframing, prototyping, visual design, and development. I maintain close collaboration with clients throughout each phase to ensure the final product aligns with their vision.",
  },
  {
    question: "How long does a project usually take?",
    answer:
      "Timelines vary based on complexity. A typical website takes 4-8 weeks, while larger web applications may take 2-4 months. I provide a detailed timeline during our initial consultation.",
  },
  {
    question: "What do you need to get started on a project?",
    answer:
      "I need a clear brief outlining your goals, target audience, preferred timeline, and any brand assets (logos, colors, content). The more context you provide, the smoother the process will be.",
  },
  {
    question: "Do you offer revisions?",
    answer:
      "Yes, revisions are part of the process. Each phase includes rounds of feedback and refinement to ensure the deliverables meet your expectations before moving forward.",
  },
  {
    question: "How do I get started?",
    answer:
      "Simply reach out through the contact form below with a brief description of your project. I'll get back to you within 24 hours to schedule a free consultation call.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="section-wrapper border-t border-[var(--color-border)] bg-[var(--color-bg)]">
      <div className="container-wide">
        
        {/* Section Header */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="section-label mb-4">Questions</p>
            <h2 className="display-lg">
              Frequently Asked <span className="text-[var(--color-accent)]">FAQs</span>
            </h2>
          </div>
          <p className="text-[var(--color-text-secondary)] font-light max-w-sm leading-relaxed text-sm md:text-base">
            Common questions answered about project workflows, deliverable assets, and operational processes.
          </p>
        </div>

        {/* Accordions Container */}
        <div className="max-w-3xl mx-auto flex flex-col gap-4">
          {faqs.map((faq, index) => {
            const num = String(index + 1).padStart(2, "0");
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="card-base overflow-hidden"
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-4 pr-4">
                    <span className="font-mono text-xs text-[var(--color-accent)]">
                      {num}
                    </span>
                    <span className="font-display font-bold text-base md:text-lg uppercase tracking-wide text-[var(--color-text)]">
                      {faq.question}
                    </span>
                  </div>
                  <div className="size-8 rounded-full bg-[var(--color-surface-2)] flex items-center justify-center border border-[var(--color-border)] shrink-0 transition-all">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`text-[var(--color-text-secondary)] transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-2 font-light text-sm text-[var(--color-text-secondary)] leading-relaxed border-t border-[var(--color-border)] ml-9 mt-1">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
