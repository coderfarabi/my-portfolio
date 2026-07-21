import { cache } from "react";
import { db } from "@/lib/firebase";
import type { SocialLink } from "./social-links.types";

const COLLECTION = "social-links";

export const fetchSocialLinks = cache(async (): Promise<SocialLink[]> => {
  const snapshot = await db()
    .collection(COLLECTION)
    .orderBy("order", "asc")
    .get();

  return snapshot.docs
    .map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<SocialLink, "id">),
    }))
    .filter((link) => link.isVisible);
});
