import { fetchSocialLinks } from "./social-links.repository";
import { SocialLinksListSchema } from "./social-links.schema";
import type { SocialLink } from "./social-links.types";

export const getSocialLinks = async (): Promise<SocialLink[]> => {
  const raw = await fetchSocialLinks();

  const parsed = SocialLinksListSchema.safeParse(raw);
  if (!parsed.success) {
    console.error("Social links validation errors:", parsed.error.format());
  }

  return raw;
};
