export type SocialPlatform =
  | "github"
  | "linkedin"
  | "twitter"
  | "instagram"
  | "youtube"
  | "facebook"
  | "dribbble"
  | "behance"
  | "devto"
  | "hashnode"
  | "medium"
  | "stackoverflow"
  | "discord"
  | "telegram"
  | "whatsapp"
  | "email"
  | "website"
  | "other";

export interface SocialLink {
  id?: string;
  platform: SocialPlatform;
  label: string;
  url: string;
  iconUrl?: string;
  isVisible: boolean;
  order?: number;
}
