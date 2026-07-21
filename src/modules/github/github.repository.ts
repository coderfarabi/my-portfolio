import { cache } from "react";
import { getGitHubClient, PINNED_REPOS_QUERY, PinnedReposQueryResult } from "@/lib/github";
import { ApiError } from "@/lib/api-error";
import type { RepositoryDetails } from "./github.types";

export const fetchPinnedRepositories = cache(async (username: string, limit = 6): Promise<RepositoryDetails[]> => {
  const client = getGitHubClient();
  
  try {
    const data = await client.request<PinnedReposQueryResult>(PINNED_REPOS_QUERY, {
      username,
      first: limit,
    });

    const nodes = data.user?.pinnedItems?.nodes || [];

    return nodes.map((node) => ({
      name: node.name,
      description: node.description,
      url: node.url,
      homepageUrl: node.homepageUrl,
      stars: node.stargazerCount,
      forks: node.forkCount,
      primaryLanguage: node.primaryLanguage,
      topics: node.repositoryTopics.nodes.map((t) => t.topic.name),
      license: node.licenseInfo?.spdxId || node.licenseInfo?.name || null,
      createdAt: node.createdAt,
      updatedAt: node.updatedAt,
      defaultBranch: node.defaultBranchRef?.name || "main",
      openGraphImageUrl: node.openGraphImageUrl,
    }));
  } catch (error) {
    console.error("GitHub API Query failed:", error);
    throw new ApiError("Failed to fetch data from GitHub API", 502, error);
  }
});
