import { fetchPinnedRepositories } from "./github.repository";
import { RepositoryDetailsListSchema } from "./github.schema";
import { env } from "@/config/env";
import { db } from "@/lib/firebase";
import type { RepositoryDetails } from "./github.types";

const SETTINGS_COLLECTION = "site-settings";
const SETTINGS_DOC = "main";

export const getPinnedRepositories = async (limit = 6): Promise<RepositoryDetails[]> => {
  // 1. Fetch GitHub username from site settings in Firestore, fallback to env
  let username = env.GITHUB_USERNAME;
  try {
    const settings = await db().collection(SETTINGS_COLLECTION).doc(SETTINGS_DOC).get();
    if (settings.exists) {
      const data = settings.data();
      if (data?.githubUsername) {
        username = data.githubUsername;
      }
    }
  } catch (error) {
    console.warn("Failed to fetch githubUsername from site-settings, using env fallback:", error);
  }

  // 2. Fetch from GitHub API
  const raw = await fetchPinnedRepositories(username, limit);

  // 3. Validate response
  const parsed = RepositoryDetailsListSchema.safeParse(raw);
  if (!parsed.success) {
    console.error("GitHub repositories validation errors:", parsed.error.format());
  }

  return parsed.data ?? raw;
};
