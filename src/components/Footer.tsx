"use client";

import { useState, useEffect } from "react";
import { getHero, getSocialLinks, type HeroData, type SocialLinkData } from "@/lib/api";
import { PLATFORM_ICONS } from "@/lib/constants";

const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const [hero, setHero] = useState<HeroData | null>(null);
  const [socialLinks, setSocialLinks] = useState<SocialLinkData[]>([]);

  useEffect(() => {
    getHero().then(setHero).catch(() => {});
    getSocialLinks().then(setSocialLinks).catch((err) => console.error("Error loading socials:", err));
  }, []);

  const brandName = hero?.brandName || "Port";

  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg)]">
      <div className="container-wide py-16 md:py-24">
        
        {/* Footer Top */}
        <div className="grid md:grid-cols-12 gap-12 lg:gap-16 mb-16">
          
          {/* Logo & Tagline */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <a href="#hero" className="flex items-center gap-1.5 w-fit group">
              <span className="font-display text-xl font-bold uppercase text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors duration-200">
                {brandName}
              </span>
              <span className="accent-dot group-hover:scale-125 transition-transform duration-200" />
            </a>
            <p className="text-sm text-[var(--color-text-secondary)] font-light leading-relaxed max-w-sm">
              Creating bespoke digital interfaces built with performance, security, and micro-animations at heart.
            </p>
          </div>

          {/* Links Column */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <h4 className="text-[10px] font-mono text-[var(--color-text-muted)] uppercase tracking-widest">
              Navigation
            </h4>
            <nav className="flex flex-col gap-3">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors w-fit font-light"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Socials Connection Column */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <h4 className="text-[10px] font-mono text-[var(--color-text-muted)] uppercase tracking-widest">
              Social Links
            </h4>
            <div className="flex flex-wrap items-center gap-2">
              {socialLinks.map((link) => (
                <a
                  key={link.platform + link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="size-9 rounded-full bg-[var(--color-surface-2)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-secondary)] hover:text-black hover:bg-[var(--color-accent)] hover:border-[var(--color-accent)] transition-all duration-200"
                  aria-label={link.label}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      d={
                        PLATFORM_ICONS[link.platform.toLowerCase()] ||
                        PLATFORM_ICONS.github
                      }
                    />
                  </svg>
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--color-text-muted)] font-mono uppercase tracking-wider">
            &copy; {new Date().getFullYear()} {brandName}. All rights reserved.
          </p>
          
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 text-xs font-mono text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors cursor-pointer group"
          >
            Back to Top
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transform transition-transform duration-200 group-hover:-translate-y-0.5"
            >
              <line x1="12" y1="19" x2="12" y2="5" />
              <polyline points="5 12 12 5 19 12" />
            </svg>
          </button>
        </div>

      </div>
    </footer>
  );
}
