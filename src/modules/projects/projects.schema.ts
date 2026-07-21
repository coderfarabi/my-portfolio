import { z } from "zod";
import { RepositoryDetailsSchema } from "../github/github.schema";

export const ProjectMetadataSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
  tags: z.array(z.string()).default([]),
  thumbnailUrl: z.string().url("Thumbnail URL must be a valid URL").optional(),
  githubRepoName: z.string().optional(),
  githubOwner: z.string().optional(),
  demoUrl: z.string().url("Demo URL must be a valid URL").optional(),
  isFeatured: z.boolean(),
  order: z.number().int().nonnegative().optional(),
});

export const ProjectSchema = ProjectMetadataSchema.extend({
  id: z.string(),
  githubStats: RepositoryDetailsSchema.nullable(),
});

export const ProjectListSchema = z.array(ProjectSchema);
