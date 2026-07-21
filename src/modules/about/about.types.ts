export interface About {
  id?: string;
  name: string;
  tagline: string;
  bio: string;
  location: string;
  avatarUrl: string;
  resumeUrl?: string;
  yearsOfExperience: number;
  openToWork: boolean;
  updatedAt?: string;
}
