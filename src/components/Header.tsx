"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getHero, getAbout, type HeroData, type AboutData } from "@/lib/api";

const NAV_ITEMS = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hero, setHero] = useState<HeroData | null>(null);
  const [about, setAbout] = useState<AboutData | null>(null);
  const prevScroll = useRef(0);

  useEffect(() => {
    getHero().then(setHero).catch(() => {});
    getAbout().then(setAbout).catch(() => {});
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      if (current > 80 && current > prevScroll.current) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      setScrolled(current > 50);
      prevScroll.current = current;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Glass background layer with punch-hole cutouts */}
      <div className={`absolute inset-0 ${scrolled ? "rounded-b-[20px] overflow-hidden" : ""}`}>
        <div
          className={`absolute inset-0 transition-all duration-300 ${
            scrolled
              ? "bg-[var(--color-bg)]/75 backdrop-blur-xl shadow-sm"
              : "bg-transparent"
          }`}
        />
      </div>

      {/* Content layer */}
      <div className="relative z-20 mx-auto max-w-6xl px-6 flex items-center justify-between h-16 md:h-20">
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="profile-punch size-9 md:size-10 rounded-full overflow-hidden border-2 border-[var(--color-border)] bg-[var(--color-surface)] shrink-0 transition-all duration-300 group-hover:border-[var(--color-accent)]">
            {about?.avatarUrl ? (
              <img
                src={about.avatarUrl}
                alt={about.name}
                className="size-full object-cover transition-all duration-500"
              />
            ) : (
              <div className="size-full flex items-center justify-center bg-[var(--color-surface-2)] text-[var(--color-text-muted)] font-display text-sm">
                {hero?.brandName?.[0] || "P"}
              </div>
            )}
          </div>
          <span className="text-base md:text-lg font-bold font-display tracking-tight bg-gradient-to-r from-accent to-accent-hover bg-clip-text text-transparent">
            {hero?.brandName || "Portfolio"}
          </span>
        </a>

        <motion.nav
          animate={{ y: hidden ? -16 : 0, opacity: hidden ? 0 : 1 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="hidden md:flex items-center gap-8"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-text-secondary hover:text-text transition-colors duration-200"
            >
              {item.label}
            </a>
          ))}
        </motion.nav>

        <motion.div
          animate={{ y: hidden ? -16 : 0, opacity: hidden ? 0 : 1 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="hidden md:flex items-center gap-4"
        >
          <a
            href="#contact"
            className="px-5 py-2.5 bg-accent text-bg text-sm font-medium rounded-xl hover:bg-accent-hover transition-all duration-200 hover:shadow-lg hover:shadow-accent/20"
          >
            Let&apos;s Talk
          </a>
        </motion.div>

        <button
          className="md:hidden flex flex-col gap-1.5 p-2 relative z-50"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block h-0.5 w-5 bg-text transition-transform duration-300 ${
              mobileOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-5 bg-text transition-opacity duration-300 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-5 bg-text transition-transform duration-300 ${
              mobileOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-surface/95 backdrop-blur-xl border-b border-border px-6 py-6 flex flex-col gap-5"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-base text-text-secondary hover:text-text transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-5 py-2.5 bg-accent text-bg text-sm font-medium rounded-xl hover:bg-accent-hover transition-colors mt-2"
              onClick={() => setMobileOpen(false)}
            >
              Let&apos;s Talk
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
