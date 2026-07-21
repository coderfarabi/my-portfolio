import { z } from "zod";

export const NewsletterSubscribeSchema = z.object({
  email: z.string().email("Must be a valid email address"),
});

export type NewsletterSubscribeInput = z.infer<typeof NewsletterSubscribeSchema>;
