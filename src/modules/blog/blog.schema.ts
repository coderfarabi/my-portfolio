import { z } from "zod";

export const BlogPostSchema = z.object({
  id: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  date: z.string().min(1, "Date is required"),
  title: z.string().min(1, "Title is required"),
  excerpt: z.string().min(1, "Excerpt is required"),
  slug: z.string().min(1, "Slug is required"),
  order: z.number().optional(),
});

export type BlogPostInput = z.infer<typeof BlogPostSchema>;
