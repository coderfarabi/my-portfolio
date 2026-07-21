import { fetchBlogPosts } from "./blog.repository";
import { BlogPostSchema } from "./blog.schema";
import type { BlogPost } from "./blog.types";

export const getBlogPosts = async (): Promise<BlogPost[]> => {
  const raw = await fetchBlogPosts();

  for (const item of raw) {
    const parsed = BlogPostSchema.safeParse(item);
    if (!parsed.success) {
      console.error("Blog post validation failed:", parsed.error.format());
    }
  }

  return raw;
};
