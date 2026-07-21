import { z } from "zod";

export const TestimonialSchema = z.object({
  id: z.string().optional(),
  quote: z.string().min(1, "Quote is required"),
  author: z.string().min(1, "Author is required"),
  role: z.string().min(1, "Role is required"),
  rating: z.number().min(1).max(5),
  order: z.number().optional(),
});

export type TestimonialInput = z.infer<typeof TestimonialSchema>;
