export interface Hero {
  id?: string;
  greeting: string;
  name: string;
  title: string;
  subtitle: string;
  ctaPrimaryLabel: string;
  ctaPrimaryUrl: string;
  ctaSecondaryLabel: string;
  ctaSecondaryUrl: string;
  highlightedWords?: string[];
  siteTitle?: string;
  faviconUrl?: string;
  brandName?: string;
  cursorEnabled?: boolean;
}
