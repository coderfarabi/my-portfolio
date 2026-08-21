import { fetchTestimonials } from "./testimonials.repository";
import { TestimonialSchema } from "./testimonials.schema";
import type { Testimonial } from "./testimonials.types";

export const getTestimonials = async (): Promise<Testimonial[]> => {
  const raw = await fetchTestimonials();

  const valid: Testimonial[] = [];
  for (const item of raw) {
    const parsed = TestimonialSchema.safeParse(item);
    if (parsed.success) {
      valid.push(parsed.data);
    } else {
      console.error("Testimonial validation failed:", parsed.error.format());
    }
  }

  return valid;
};
