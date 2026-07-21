import { z } from "zod";

export const FAQSchema = z.object({
  id: z.string().optional(),
  question: z.string().min(1, "Question is required"),
  answer: z.string().min(1, "Answer is required"),
  order: z.number().optional(),
});

export type FAQInput = z.infer<typeof FAQSchema>;
