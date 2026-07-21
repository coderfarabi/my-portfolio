"use client";

import { useEffect } from "react";
import { getHero } from "@/lib/api";

export default function SiteHead() {
  useEffect(() => {
    getHero()
      .then((hero) => {
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
      })
      .catch(() => {});
  }, []);

  return null;
}
