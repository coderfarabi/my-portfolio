export interface AboutStat {
  number?: string;
  label: string;
  value: string;
  description?: string;
}

export interface About {
  id?: string;
  tagline: string;
  bio: string;
  location: string;
  avatarUrl: string;
  resumeUrl?: string;
  yearsOfExperience: number;
  showStats?: boolean;
  updatedAt?: string;
  stats?: AboutStat[];
}
