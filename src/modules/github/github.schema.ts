import { z } from "zod";

export const RepositoryDetailsSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().nullable(),
  url: z.string().url("URL must be a valid URL"),
  homepageUrl: z.string().url("Homepage URL must be a valid URL").nullable(),
  stars: z.number().int().nonnegative(),
  forks: z.number().int().nonnegative(),
  primaryLanguage: z.object({
    name: z.string(),
    color: z.string(),
  }).nullable(),
  topics: z.array(z.string()),
  license: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
  defaultBranch: z.string(),
  openGraphImageUrl: z.string().url("Open Graph Image URL must be a valid URL"),
});

export const RepositoryDetailsListSchema = z.array(RepositoryDetailsSchema);
