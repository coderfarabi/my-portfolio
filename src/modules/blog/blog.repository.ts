import { cache } from "react";
import { db } from "@/lib/firebase";
import type { BlogPost } from "./blog.types";

const COLLECTION = "blog";

export const fetchBlogPosts = cache(async (): Promise<BlogPost[]> => {
  const snapshot = await db().collection(COLLECTION).orderBy("order", "asc").get();

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<BlogPost, "id">),
  }));
});
