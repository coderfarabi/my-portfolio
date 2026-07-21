import { RepositoryDetails } from "../github/github.types";

export interface ProjectMetadata {
  id?: string;
  title: string;
  description: string; // Custom description overriding github
  category: string; // e.g. "frontend", "fullstack"
  tags: string[];
  thumbnailUrl?: string; // Custom preview image path
  githubRepoName?: string; // If connected to a repo
  githubOwner?: string; // If owner is different
  demoUrl?: string;
  isFeatured: boolean;
  order?: number;
}

export interface Project extends Omit<ProjectMetadata, "id"> {
  id: string;
  githubStats: RepositoryDetails | null;
}
