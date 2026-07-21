export interface RepositoryDetails {
  name: string;
  description: string | null;
  url: string;
  homepageUrl: string | null;
  stars: number;
  forks: number;
  primaryLanguage: {
    name: string;
    color: string;
  } | null;
  topics: string[];
  license: string | null;
  createdAt: string;
  updatedAt: string;
  defaultBranch: string;
  openGraphImageUrl: string;
}
