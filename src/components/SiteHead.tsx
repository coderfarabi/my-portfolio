"use client";

import { useEffect } from "react";
import { usePortfolioData } from "@/context/DataContext";

export default function SiteHead() {
  const { hero } = usePortfolioData();

  useEffect(() => {
    if (!hero) return;
    if (hero.siteTitle) {
      document.title = hero.siteTitle;
    }
    if (hero.faviconUrl) {
      const existing = document.querySelector("link[rel='icon']");
      if (existing) {
        (existing as HTMLLinkElement).href = hero.faviconUrl;
      } else {
        const link = document.createElement("link");
        link.rel = "icon";
        link.href = hero.faviconUrl;
        document.head.appendChild(link);
      }
    }
  }, [hero]);

  return null;
}
