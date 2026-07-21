import { fetchPinnedRepositories } from "./github.repository";
import { RepositoryDetailsListSchema } from "./github.schema";
import { db } from "@/lib/firebase";
import type { RepositoryDetails } from "./github.types";

const SETTINGS_COLLECTION = "site-settings";
const SETTINGS_DOC = "main";

export const getPinnedRepositories = async (limit = 6): Promise<RepositoryDetails[]> => {
  // 1. Fetch GitHub username from site settings in Firestore
  let username = "aarfan-sayeed"; // Default fallback
  try {
    const settings = await db().collection(SETTINGS_COLLECTION).doc(SETTINGS_DOC).get();
    if (settings.exists) {
      const data = settings.data();
      if (data?.githubUsername) {
        username = data.githubUsername;
      }
    }
  } catch (error) {
    console.warn("Failed to fetch githubUsername from site-settings, using fallback:", error);
  }

  // 2. Fetch from GitHub API
  const raw = await fetchPinnedRepositories(username, limit);

  // 3. Validate response
  const parsed = RepositoryDetailsListSchema.safeParse(raw);
  if (!parsed.success) {
    console.error("GitHub repositories validation errors:", parsed.error.format());
  }

  return raw;
};
