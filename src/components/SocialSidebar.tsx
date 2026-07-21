"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getSocialLinks, type SocialLinkData } from "@/lib/api";
import { PLATFORM_ICONS } from "@/lib/constants";

export default function SocialSidebar() {
  const [socialLinks, setSocialLinks] = useState<SocialLinkData[]>([]);

  useEffect(() => {
    getSocialLinks()
      .then(setSocialLinks)
      .catch((err) => console.error("Error loading socials:", err));
  }, []);

  if (socialLinks.length === 0) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.07, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
  };

  return (
    <>
      {/* Desktop: Left Rail */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="fixed left-6 md:left-10 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-4"
      >
        <motion.div variants={itemVariants} className="w-px h-16 bg-[var(--color-border)]" />

        {socialLinks.map((link) => (
          <motion.div key={link.platform + link.url} variants={itemVariants} className="relative group">
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative size-10 rounded-full bg-[var(--color-surface-2)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-secondary)] hover:text-black hover:bg-[var(--color-accent)] hover:border-[var(--color-accent)] transition-all duration-200"
              aria-label={link.label}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d={PLATFORM_ICONS[link.platform.toLowerCase()] || PLATFORM_ICONS.github} />
              </svg>
            </a>
            <span className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[10px] font-mono text-[var(--color-text-secondary)] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
              {link.label}
            </span>
          </motion.div>
        ))}

        <motion.div variants={itemVariants} className="w-px h-16 bg-[var(--color-border)]" />
      </motion.div>

      {/* Mobile: Bottom Bar */}
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
        className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[var(--color-bg)]/80 backdrop-blur-xl border-t border-[var(--color-border)]"
      >
        <div className="flex items-center justify-center gap-3 px-4 py-3 overflow-x-auto">
          {socialLinks.map((link) => (
            <a
              key={link.platform + link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="size-9 shrink-0 rounded-full bg-[var(--color-surface-2)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-secondary)] hover:text-black hover:bg-[var(--color-accent)] hover:border-[var(--color-accent)] transition-all duration-200"
              aria-label={link.label}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d={PLATFORM_ICONS[link.platform.toLowerCase()] || PLATFORM_ICONS.github} />
              </svg>
            </a>
          ))}
        </div>
      </motion.div>
    </>
  );
}
