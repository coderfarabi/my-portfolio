import { fetchProjectsMetadata } from "./projects.repository";
import { ProjectMetadataSchema } from "./projects.schema";
import { getGitHubClient, REPO_DETAILS_QUERY, RepoDetailsQueryResult } from "@/lib/github";
import { env } from "@/config/env";
import { db } from "@/lib/firebase";
import type { Project, ProjectMetadata } from "./projects.types";
import type { RepositoryDetails } from "../github/github.types";

const SETTINGS_COLLECTION = "site-settings";
const SETTINGS_DOC = "main";

export const getProjects = async (): Promise<Project[]> => {
  // 1. Fetch and validate Projects Metadata
  const rawMetadata = await fetchProjectsMetadata();
  const metadata: ProjectMetadata[] = [];
  for (const item of rawMetadata) {
    const parsed = ProjectMetadataSchema.safeParse(item);
    if (parsed.success) {
      metadata.push(parsed.data as ProjectMetadata);
    } else {
      console.error("Project metadata validation failed:", parsed.error.format());
    }
  }

  // 2. Fetch target GitHub username (fallback from env)
  let defaultOwner = env.GITHUB_USERNAME;
  try {
    const settings = await db().collection(SETTINGS_COLLECTION).doc(SETTINGS_DOC).get();
    if (settings.exists) {
      const data = settings.data();
      if (data?.githubUsername) {
        defaultOwner = data.githubUsername;
      }
    }
  } catch (error) {
    console.warn("Failed to fetch githubUsername for projects, using fallback:", error);
  }

  const client = getGitHubClient();

  // 3. Resolve GitHub stats in parallel
  const resolvedProjects = await Promise.all(
    metadata.map(async (item): Promise<Project> => {
      const id = item.id || "";
      let githubStats: RepositoryDetails | null = null;

      if (item.githubRepoName) {
        const owner = item.githubOwner || defaultOwner;
        const name = item.githubRepoName;

        try {
          const res = await client.request<RepoDetailsQueryResult>(REPO_DETAILS_QUERY, {
            owner,
            name,
          });

          if (res.repository) {
            const repo = res.repository;
            githubStats = {
              name: repo.name,
              description: repo.description,
              url: repo.url,
              homepageUrl: repo.homepageUrl,
              stars: repo.stargazerCount,
              forks: repo.forkCount,
              primaryLanguage: repo.primaryLanguage,
              topics: repo.repositoryTopics.nodes.map((t) => t.topic.name),
              license: repo.licenseInfo?.spdxId || repo.licenseInfo?.name || null,
              createdAt: repo.createdAt,
              updatedAt: repo.updatedAt,
              defaultBranch: repo.defaultBranchRef?.name || "main",
              openGraphImageUrl: repo.openGraphImageUrl,
            };
          }
        } catch (error) {
          console.error(`Failed to fetch GitHub stats for ${owner}/${name}:`, error);
          // Don't crash the entire list, let this project fallback to null stats
        }
      }

      // If no custom thumbnail is provided, fallback to the repository's open graph image
      const finalThumbnailUrl = item.thumbnailUrl || githubStats?.openGraphImageUrl || "";

      const cleanMetadata: Omit<ProjectMetadata, "id"> = {
        title: item.title,
        description: item.description,
        category: item.category,
        tags: item.tags,
        thumbnailUrl: finalThumbnailUrl,
        githubRepoName: item.githubRepoName,
        githubOwner: item.githubOwner,
        demoUrl: item.demoUrl || githubStats?.homepageUrl || undefined,
        isFeatured: item.isFeatured,
        order: item.order,
      };

      return {
        ...cleanMetadata,
        id,
        githubStats,
      };
    })
  );

  return resolvedProjects;
};
